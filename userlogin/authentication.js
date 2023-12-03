const express = require("express");
const route = express.Router();
const { register, login } = require("./login-singin");
const dotenv = require("dotenv");
dotenv.config();

// for register

let arry = [];
route.post("/register", register);
// for login
route.post("/login", login);

module.exports = route;
