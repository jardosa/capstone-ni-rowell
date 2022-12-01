const { json } = require("express");
const Product = require("../models/Product.js");
const User = require("../models/User.js");
const auth = require("../auth.js");


// Add new product (Admin only)
module.exports.newProduct = (data) => {
    
    let addProduct = new Product ({
        productName: data.product.productName,
        description: data.product.description,
        price: data.product.price,
        stock: data.product.stock
    });
    
    console.log(data)
    
    if (data.isAdmin) {
        
        console.log(addProduct);

        return addProduct.save().then((product, error) => {
            if (error) {
                return message = "Access restricted for non-admin.";
            } else {
                return addProduct
            };
        });
    } else {
        return false;
    };
};

// Retrieve all products
module.exports.getProductlist = () => {

    return Product.find({}).then(result => {
        return result
    });
};

// Retrieve all Active Products
module.exports.activeProducts = () => {
    return Product.find({isAvailable: true}).then(result => {
        return result;
    });
};

// Retrieve all Inactive Products
module.exports.inactiveProducts = () => {
    return Product.find({isAvailable: false}).then(result => {
        return result;
    });
};

// Retrieve a specific product
module.exports.getProduct = (reqParams) => {
    return Product.findById(reqParams.productId).then(result => {
        return result;
    });
};

// Update a specific product (Admin only)
module.exports.updateProduct = (reqParams, data) => {

    let updatedProduct = {
        productName: data.product.productName,
        description: data.product.description,
        price: data.product.price,
        stock: data.product.stock,        
    };

    console.log(data);

    if (data.isAdmin) {
        return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((product, error) => {
            if (error) {
                return message = "Failed to update.";
            } else {
                return Product.findById(reqParams.productId);
            };
        });
    } else {
        return message = "Failed to update.";
    }
};

// Archive a specific product (admin only)
module.exports.archiveProduct = (reqParams, data) => {

    let archivedProduct = {
        isAvailable: data.product.isAvailable
    };

    console.log({archivedProduct});

    console.log(data)
    if (data.isAdmin) {
        return Product.findByIdAndUpdate(reqParams.productId, archivedProduct).then((product, error) => {
                if (error) {
                    return message = "Failed to archive.";
                } else {
                    return Product.findById(reqParams.productId);
                };
            });
    } else {
        return message = "Failed to archive.";
    }
};

// Activate a product (Admin only)
module.exports.activateProduct = (reqParams, data) => {

    const activatedProduct = {
        isAvailable: data.product.isAvailable
    };

    if (data.isAdmin) {
        return Product.findByIdAndUpdate(reqParams.productId, activatedProduct).then((product, error) => {
            if (error) {
                return message = "Failed to activate an archived product.";
            } else {
                return Product.findById(reqParams.productId);
            };
        });
    } else {
        return message = "Failed to activate an archived product.";
    }
};

// Delete product by ID
module.exports.deleteProduct = (reqParams, data) => {

    const deletedProduct = {
        product: data.product
    };

    if (data.isAdmin) {
        return Product.findByIdAndRemove(reqParams.productId, deletedProduct).then((removedProduct, error) => {
            if (error) {
                console.log(error);
                return false;
            } else {
                return removedProduct;
            };
        });
    }
};