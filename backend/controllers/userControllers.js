const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");
const Product = require("../models/Product.js");

// Email check controller
module.exports.checkEmailExists = (reqBody) => {
    return User.find({email: reqBody.email})
    .then(result => {
        if (result.length > 0) {           
            return message = `User is in our database.`
        } else {
            return message = `User does not exist.`
        };
    });
};

// User registration controller that prevents duplicate registration
module.exports.registerUser = (requestBody) => {
    return User.findOne({email: requestBody.email})
    .then(result => {
        let newUser = new User ({
            firstName: requestBody.firstName,
            lastName: requestBody.lastName,
            email: requestBody.email,
            userName: requestBody.userName,
            mobileNo: requestBody.mobileNo,
            password: bcrypt.hashSync(requestBody.password, 10)
        })

        if (result !== null && result.email === requestBody.email) {
            return message = `Email already exist.`
        } else {
            return newUser.save().then((result) => {
                if (!result) {
                    return false;
                } else {
                    return newUser;
                };
            });
        };
    });
};

// User Login controller
module.exports.loginUser = (requestBody) => {
    return User.findOne({email: requestBody.email}).then(result => {
        if (result == null) {
            return false;
        } else {
            const isPasswordCorrect = bcrypt.compareSync(requestBody.password, result.password);

            if (isPasswordCorrect) {
                return {access: auth.createAccessToken(result)}
            } else {
                return false;
            };
        };
    });
};

// User database controller
module.exports.getUserList = () => {
    
        return User.find({}).then(result => {        
            return result;
        });
    
};

// User details via authentication token
module.exports.getProfile = (data) => {
    return User.findById(data.userId)
    .then(result => {
        result.password = "********";
        return result;
    });
};

// Set user as admin
/* module.exports.updateUser = (reqParams, data) => {
    
    let setAdmin = {
        isAdmin: data.isAdmin
    }
    
    if (data.isAdmin) {
        return User.findByIdAndUpdate(reqParams.userId, setAdmin).then((user, error) => {
            if (error) {
                return message = "Failed to update.";
            } else {
                return User.findById(reqParams.userId);
            };
        });
    }
}; */
module.exports.updateUser = (reqParams, data) => {
	if(data.isAdmin) {
		return User.findById(reqParams.userId).then((result)=>{
			if(result.isAdmin !== true){
				return User.findByIdAndUpdate(reqParams.userId, {isAdmin: true}).then((result, error) => {
					if(error){
						return false;
					} else{
						return User.findById(reqParams.userId).then(result => {
                            return result;
                        });
					}
				});	
			} else{
				return User.findByIdAndUpdate(reqParams.userId, {isAdmin: false}).then((result, error) => {
					if(error){
						return false;
					} else{
						return User.findById(reqParams.userId).then(result => {
                            return result;
                        });
					}
				});
			}
		});
	} else {
		return false;
	}
}



// Get user by Id
module.exports.getUser = (reqParams) => {
    return User.findById(reqParams.userId).then(result => {
        return result;
    });
};

// Create order
module.exports.createOrder = async (data) =>{
	let userUpdate = await User.findById(data.userId).then(user=>{
		user.orders.push({
            products:[{
                productId : data.productId,
                productName : data.productName,
                quantity : data.quantity
		    }],
            totalAmount : data.totalAmount
        });

		return user.save().then((user,error)=>{
			if(error){
				return false;
			}else {
				return true;
			};
		});
	});

	let productUpdate = await Product.findById(data.productId).then(product=>{
        
        product.orders.push({            
            userId : data.userId,
            quantity : data.quantity});

		return product.save().then((product,error)=>{
			if(error){
				return false;
			}else{
				return true;
			};
		});
	});

	if(userUpdate && productUpdate){
		return true
	}else{
		return data;
	}
};

// Retrieve a user order (non-admin)


// Retrieve all orders













































// Add to cart controller
/* module.exports.addToCart = async (data) => {

    const mproduct = Product;
    const userRecord = await User.findOne({id: data.userId}).exec();
    const cartItems = userRecord.cart.products;
    const updatedCart = []

    data.products.forEach((product) => {
        if (!!cartItems.find((cartItem) => {
            return cartItem.productId === product.productId;
        })) {
            updatedCart.push({
                productId: product.productId,
                quantity: product.quantity
            })
        }
    })

    // 
    User.findByIdAndUpdate(data.userId, {$set: 
        {cart: {products: updatedCart}},        
    },
    {
        upsert: true
    });

    // mproduct.
    console.log(userRecord);


    if (data.products.quantity)
}; */