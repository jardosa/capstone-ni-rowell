const express = require("express");
const router = express.Router();

const {newProduct, activeProducts, inactiveProducts, getProductlist, getProduct, updateProduct, archiveProduct, activateProduct, deleteAllProduct, deleteProduct} = require("../controllers/productControllers.js");



const auth = require("../auth.js");


// Add product (Admin only)
router.route("/new").post(auth.verify, (req, res) => {

    const data = {
        product: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

    console.log(data);
    newProduct(data).then(resultFromController => res.send(resultFromController))
});

// Retrieve all products

router.route("/productlist").get((req,res) => {
    getProductlist().then(resultFromController => res.send(resultFromController));
});

// Retrieve all Active products
router.route("/").get((req,res) => {
    activeProducts().then(resultFromController => res.send(resultFromController));
});

// Retrieve all Inactive products
router.route("/archive").get((req,res) => {
    inactiveProducts().then(resultFromController => res.send(resultFromController));
});

// Retrieve a specific product
router.route("/:productId").get((req,res) =>{
    getProduct(req.params).then(resultFromController => res.send(resultFromController));
});

// Update a specific product (Admin only)
router.route("/:productId").put(auth.verify, (req,res) => {
    
    const data = {
        product: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

    updateProduct(req.params, data).then(resultFromController => res.send(resultFromController));

});

// Archive a specific product admin only
router.route("/:productId/archive").put(auth.verify, async (req, res) => {

    const data = {
        product: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

    archiveProduct(req.params, data).then(resultFromController => res.send(resultFromController));

});

// Make the product available (Admin only)
router.route("/:productId/activate").put(auth.verify, (req, res) => {

    const data = {     
        product: req.body,   
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

    activateProduct(req.params, data).then(resultFromController => res.send(resultFromController));

});

// Delete product by Id
router.route("/:productId/delete").delete(auth.verify, (req, res) => {
    const data = {      
        product: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    };

    deleteProduct(req.params, data).then(resultFromController => res.send(resultFromController));
});









module.exports = router;