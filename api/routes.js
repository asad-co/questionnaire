const express = require('express');
const router = express.Router();
const Model = require("./Model")
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLIC_ANON_KEY;
const { body, validationResult } = require('express-validator');

const supabase = createClient(supabaseUrl, supabaseKey);
router.use(express.json());


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


router.post('/completed',[
    body('email').isEmail().withMessage("Please enter valid email")
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors[0].msg });
    }

    try {
        const email = req.body.email;
 
        const { data, result } = await isSurveyInProgress(email)
        if (!result) {
            return res.status(404).json({ message: "survey not started" });
        }

        if (data.status === "completed") {
            
            const firstQuestion = data.progress.step1
            const secondQuestion = {
                comfort: data.progress.step2.comfort,
                looks: data.progress.step2.looks,
                price: data.progress.step2.price
            }
            const newEntry = await Model.findOneAndUpdate(
                { email: email },
                {
                    email: email,
                    firstQuestion: data.progress.step1,
                    secondQuestion: {
                        comfort: data.progress.step2.comfort,
                        looks: data.progress.step2.looks,
                        price: data.progress.step2.price
                    }
                },
                { upsert: true, new: true }
            );

            if (!newEntry)
                return res.status(500).json({ error: 'Failed to process' });

            return res.status(200).json({ message: "Survey Saved", step1:firstQuestion, step2:secondQuestion })
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