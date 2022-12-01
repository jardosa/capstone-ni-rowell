const Product = require('../backend/models/Product');
const dotenv = require('dotenv');
const connectDatabase = require('../backend/database/database');

const products = require('../backend/database/productData.json');

// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products);
        console.log('All products are added.')

        process.exit();

    } catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();

/*

I tried to create this file to avoid the hassle of manually adding products to postman.

Import this file to package.json under "script"
"seeder" : "node backend/utility/seeder.js"

by using the terminal console and typing "npm run seeder" it will automatically delete the entire database and replace a new collection of datas coming from ../data/productData.json file

*/