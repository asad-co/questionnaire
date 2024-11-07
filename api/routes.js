const express = require('express');
const router = express.Router();
const { supabase } = require('./index'); 


router.post('/startSurvey', async (req, res) => {
    try {
        const email = req.body.email
        const { data, error } = await supabase
            .from('temporary_questionnaire')
            .select()
            .is("email",email)

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;