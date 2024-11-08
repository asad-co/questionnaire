const express = require('express');
const router = express.Router();
const Model = require("./Model")
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLIC_ANON_KEY;
const { body, validationResult } = require('express-validator');

const supabase = createClient(supabaseUrl, supabaseKey);
router.use(express.json());

const isSurveyCompleted = async (email) => {
    const details = await Model.findOne({ email: email })
    if (details) {
        return details
    }
    return false
}

const isSurveyInProgress = async (email) => {
    const { data, error } = await supabase
        .from('temporary_questionnaire')
        .select()
        .eq("email", email)

    if (error || !data || data.length === 0) {
        return { data: null, result: false }
    }
    return { data: data[0], result: true }
}

router.post('/startSurvey', [
    body('email').isEmail().withMessage("Please enter valid email")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors[0].msg });
    }
    try {
        const email = req.body.email
        const isEmailUsed = await isSurveyCompleted(email)
        if (isEmailUsed) {
            return res.status(409).json({ message: "Survey already completed" })
        }

        const { data, error } = await supabase
            .from('temporary_questionnaire')
            .select()
            .eq("email", email)

        if (!error && data && data.length > 0) {
            return res.status(202).json({ step1: data[0]?.progress?.step1,step2: data[0]?.progress?.step2 });
        }
        else {
            const { error } = await supabase
                .from('temporary_questionnaire')
                .insert({
                    email: email,
                    progress: {},
                    status: "in-progress"
                })
            if (error) throw error
            return res.status(201).json({ message: "starting new survey" })
        }
    } catch (err) {
        console.log({ err })
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/choice', [
    body('email').isEmail().withMessage("Please enter valid email"),
    body('choice').isIn(['nike orange', 'nike black']).withMessage("Choice must be either 'nike orange' or 'nike black'"),
    ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors[0].msg });
    }
    try {
        const shoes = req.body.choice
        const email = req.body.email

        const isEmailUsed = await isSurveyCompleted(email)

        if (isEmailUsed) {
            if (isEmailUsed.firstQuestion === shoes) {
                return res.status(200).json({ message: "Already updated" });
            }
            const updateResult = await Model.updateOne(
                { email: email },
                { $set: { firstQuestion: shoes } }
            );

            if (updateResult.modifiedCount === 0) {
                throw new Error("Failed to update firstQuestion in MongoDB");
            }
            return res.status(200).json({ message: "Survey updated" })
        }

        const { data, result } = await isSurveyInProgress(email)
        if (!result) {
            return res.status(404).json({ message: "survey not started" });
        }
        else {
            const updatedData = { step1: shoes, ...data.progress }

            const { error } = await supabase
                .from('temporary_questionnaire')
                .update({
                    progress: updatedData
                })
                .eq('email', email)
            if (error) throw error
            return res.status(200).json({ message: "saved the choice" })
        }
    } catch (err) {
        console.log({ err })
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/score', [
    body('email').isEmail().withMessage("Please enter valid email"),
    body('comfort').isInt({ gt: 0, lt: 6 }).withMessage('Comfort must be a number between 1 and 5'),
    body('looks').isInt({ gt: 0, lt: 6 }).withMessage('Looks must be a number between 1 and 5'),
    body('price').isInt({ gt: 0, lt: 6 }).withMessage('Price must be a number between 1 and 5'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors[0].msg });
    }

    try {
        const email = req.body.email;
        const comfort = req.body.comfort;
        const looks = req.body.looks;
        const price = req.body.price;

        const isEmailUsed = await isSurveyCompleted(email)
        if (isEmailUsed) {
            const updateResult = await Model.updateOne(
                { email: email },
                { $set: { secondQuestion: {comfort,looks,price} } }
            );

            if (updateResult.modifiedCount === 0) {
                throw new Error("Failed to update firstQuestion in MongoDB");
            }
            return res.status(200).json({ message: "Survey updated" })
        }

        const { data, result } = await isSurveyInProgress(email)
        if (!result) {
            return res.status(404).json({ message: "survey not started" });
        }
        else {
            if (!data?.progress?.step1) {
                return res.status(400).json({ message: "step 1 is not completed" })
            }
            const updatedData = { step2: { comfort, looks, price }, ...data.progress }
            const { error } = await supabase
                .from('temporary_questionnaire')
                .update({
                    progress: updatedData,
                    status: "completed"
                })
                .eq('email', email)
            if (error) throw error
            return res.status(200).json({ message: "Scores Saved" })
        }

    } catch (err) {
        console.log({ err });
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/completed',[
    body('email').isEmail().withMessage("Please enter valid email")
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors[0].msg });
    }

    try {
        const email = req.body.email;
        const isEmailUsed = await isSurveyCompleted(email)
        if (isEmailUsed) {
            return res.status(200).json({ 
                step1: isEmailUsed?.firstQuestion,
                step2: isEmailUsed?.secondQuestion
             })
        }

        const { data, result } = await isSurveyInProgress(email)
        if (!result) {
            return res.status(404).json({ message: "survey not started" });
        }

        if (data.status === "completed") {
            const newEntry = await Model.create({
                email: email,
                firstQuestion: data.progress.step1,
                secondQuestion: {
                    comfort: data.progress.step2.comfort,
                    looks: data.progress.step2.looks,
                    price: data.progress.step2.price
                }
            })

            if (!newEntry)
                return res.status(500).json({ error: 'Failed to process' });

            const { error } = await supabase
                .from('temporary_questionnaire')
                .delete()
                .eq('email', email)
            if (error) throw error

            return res.status(200).json({ message: "Survey Saved" })
        }
        else {
            return res.status(400).json({ message: "survey not completed" });
        }

    } catch (err) {
        console.log({ err });
        if (err.code === 11000) {
            const existingData = await Model.findOne({ email: req.body.email });
            return res.status(200).json({ 
                error: 'Email already exists',
                step1: existingData?.firstQuestion,
                step2: existingData?.secondQuestion
            });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;