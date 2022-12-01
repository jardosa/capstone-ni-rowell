const User = require('../models/User');
const dotenv = require('dotenv');
const connectDatabase = require('../database/database');
const bcrypt = require("bcrypt")

const users = require('../database/userData.json');

// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const hashPassword = async (password="") => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

const seedUser = async () => {
    const userData = users.map(async (user)=> ({
        ...user,
        password: await hashPassword(user.password)
    }))

    const res = []
    for await (const user of userData) {
        res.push(user)
    }

    try {
        await User.deleteMany();
        console.log('Users are deleted');

        await User.insertMany(res);
        console.log('All users are added.')

        process.exit();

    } catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedUser();

/*

I tried to create this file to avoid the hassle of manually adding users to postman.

Import this file to package.json under "script"
"seeder" : "node backend/utility/seeder.js"

by using the terminal console and typing "npm run seeder" it will automatically delete the entire database and replace a new collection of datas coming from ../data/userData.json file

*/