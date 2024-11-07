require('dotenv').config()
const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_Name}/${process.env.DB_SET_NAME}?retryWrites=true&w=majority`;
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        });
        console.log("connected to mongo successfully");
    } catch (error) {
        console.error("Error connecting to mongo:", error);
    }
}


module.exports = connectToMongo;

