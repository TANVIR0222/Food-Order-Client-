const mongoose = require('mongoose');

const connectDB = () =>{
    try {
        mongoose.connect(process.env.DB)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log('Connected fail db',error);
        
    }
}

module.exports = connectDB
