const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://admin123:admin123@project0.zzkxx4f.mongodb.net/ecom?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true        
    });
    
    mongoose.connection.once("open", () => console.log("Connected to MongoDB Atlas!"));
}


module.exports = connectDatabase;