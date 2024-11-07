const connectToMongo = require('./db');
const { createClient } = require('@supabase/supabase-js');
const express = require('express')
const cors = require('cors')
const port = process.env.SERVER_PORT
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLIC_ANON_KEY;

connectToMongo();
const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = { supabase };

const app = express()
app.use(cors())
app.use('/api', require('./routes'))


app.listen(port, () => {
    console.log(`backend lived on port ${port}`)
  })