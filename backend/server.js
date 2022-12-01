const express = require("express");
const cors = require("cors");
const connectDatabase = require('./database/database')

const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");


const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRoutes);
app.use("/products", productRoutes);


app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`)
});