const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required."]
    },
    userName: {
        type: String,
        required: [true, "Username is required."]
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile number is required."]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: [{
        products: [{
            productId: {
                type: String
            },            
            productName: {
                type: String
            },
            price: {
                type: Number
            },
            quantity: {
                type: Number
            }            
        }],
        totalAmount: {
            type: Number            
        },
        purchasedOn: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model("User", userSchema);

















