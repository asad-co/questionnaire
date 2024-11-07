const express = require('express');
const router = express.Router();
const Model = require("./Model")
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLIC_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
router.use(express.json());

const isSurveyCompleted=async(email)=>{
    const details = await Model.findOne({ email: email })
    if (details) {
        return true
    }
}

const isSurveyInProgress = async(email)=>{
    const { data, error } = await supabase
    .from('temporary_questionnaire')
    .select()
    .eq("email", email)
    if (error || !data || data.length ===0) {
        return { data: null, result: false }
    }
    return {data,result:true}
}

router.post('/startSurvey', async (req, res) => {
    try {
        const email = req.body.email
        const isEmailUsed = await isSurveyCompleted(email)
        if (isEmailUsed){
            return res.status(409).json({ message: "Survey already completed" })
        }
        
        const { data, error } = await supabase
            .from('temporary_questionnaire')
            .select()
            .eq("email", email)
            
        if (!error && data && data.length > 0) {
            return res.status(202).json({ data: data });
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

router.post('/choice', async (req, res) => {
    try {
        const shoes = req.body.choice
        const email = req.body.email
        if (!email || !['nike orange','nike black'].includes(shoes))
            return res.status(400).json({message:"invalid input"})
   
        const isEmailUsed = await isSurveyCompleted(email)
        if (isEmailUsed){
            return res.status(409).json({ message: "Survey already completed" })
        }

        const {data,result} = await isSurveyInProgress(email)
        if(!result){
            return res.status(404).json({ message: "survey not started" });
        }
        else{
            const updatedData = {step1:shoes,...data.progress}

            const {error} = await supabase
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

module.exports = router;