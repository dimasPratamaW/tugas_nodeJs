require("dotenv").config();
const express = require("express");
const session = require('express-session');
const cors = require("cors");
const { sequelize } = require("./Database");
const ProductRouter = require("./productRouter");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }))

app.use(session({
    secret: 'sekret', // Ganti ini dengan kunci rahasia yang lebih aman di produksi
    resave: false,
    saveUninitialized: false
}));


app.use("/api/v1", ProductRouter);


sequelize
    .authenticate()
    .then(() => {
        console.log("Sequelize connected to database.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server running on port " + process.env.SERVER_PORT);
});