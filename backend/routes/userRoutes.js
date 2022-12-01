const express = require("express");
const router = express.Router();
const {checkEmailExists, registerUser, loginUser, getUserList, getProfile, updateUser, getUser, createOrder, getOrder, getOrderList, getAll} = require("../controllers/userControllers.js");

/* const userController = require("../controllers/userControllers.js"); */

const auth = require("../auth.js");
const { get } = require("mongoose");

// Check if the email already exists
router.post("/checkEmail", (req, res) => {
    checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});

// User Registration
router.post("/register", (req, res) => {
    registerUser(req.body)
    .then(resultFromcontroller => res.send(resultFromcontroller));
});

// User Login
router.post("/login", (req, res) => {
    loginUser(req.body)
    .then(resultFromcontroller => res.send(resultFromcontroller));
});

// User database
router.get("/userlist", (req, res) => {    
   
    getUserList().then(resultFromcontroller => res.send(resultFromcontroller));
    
});

// Get user details using authentication token
router.get("/details", auth.verify, (req, res) => {

    const userData = auth.decode(req.headers.authorization);
           
    getProfile({userId: userData.id}).then(resultFromController => res.send(resultFromController));

});

// Set user as admin
router.route("/:userId/admin").put(auth.verify, (req, res) => {
    
    const data = {        
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    };

    updateUser(req.params, data).then(resultFromController => res.send(resultFromController));

});


// Get user by Id
router.route("/:userId").get((req,res) => {
    
    getUser(req.params).then(resultFromController => res.send(resultFromController));

});

// Create order
router.route("/userOrders").post(auth.verify, (req,res) => {

    const isAdmin = auth.decode(req.headers.authorization).isAdmin

    if (isAdmin === true) {
        return message = "Admin users are restricted from creating order.";
    } else {
    let data = {
        userId: auth.decode(req.headers.authorization).id,
        productId: req.body.productId,
        productName: req.body.productName,
        totalAmount: req.body.totalAmount
        // totalAmount: req.body.quantity * req.body.price
    };

    createOrder(data, req.params).then(resultFromController => res.send(resultFromController));
    }
});

// Retrieve a single order



// Retrieve all orders (admin only)






















// Add to cart
/* router.post("/addtocart", auth.verify, (req, res) => {
    
    const data = {
        userId: auth.decode(req.headers.authorization).id,
        products: req.body
    }

    addToCart(data).then(resultFromController => 
    res.send("success");
}); */







module.exports = router;