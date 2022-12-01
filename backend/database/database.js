const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect("mongodb://localhost/capstone", {
        useNewUrlParser: true,
        useUnifiedTopology: true        
    });
    
    mongoose.connection.once("open", () => console.log("Connected to MongoDB Atlas!"));
}


module.exports = connectDatabase;