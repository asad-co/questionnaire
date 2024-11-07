const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
const port = process.env.SERVER_PORT

connectToMongo();

const app = express()
app.use(cors())
app.use('/api', require('./routes'))


app.listen(port, () => {
    console.log(`backend lived on port ${port}`)
  })