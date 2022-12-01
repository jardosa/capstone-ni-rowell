const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Please enter product name."],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters."]
    },
    description: {
        type: String,
        required: [true, "Please enter product description."]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price."],
        default: 0.0
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },    
    stock: {
        type: Number,
        default: 0
    },
    orders: [{

            orderId: {
                type: String
            },
            userId: {
                type: String
            },
            quantity: {
                type: Number
            },
            purchasedOn: {
                type: Date,
                default: Date.now
            }
            
    }]
});

module.exports = mongoose.model("Product", productSchema);


/* ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please select category for this product"],
        enum: {
            values: [
                "Horror",
                "MOBA",
                "Extraction-shooter",
                "MMORPG",
                "RPG",
                "Simulator",
                "Indie",
                "Sports"
            ],
            message: "Please select correct category for product"
        }
    },
    developer: {
        type: String,
        required: [true, "Please enter the game developer."]
    },
    publisher: {
        type: String,
        required: [true, "Please enter the game publisher."]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ], */