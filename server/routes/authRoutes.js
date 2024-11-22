var express = require("express");
var router = express.Router();
require("dotenv").config();
const authController = require("../controllers/authController");
const userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn"); // import the guard

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/profile", userShouldBeLoggedIn, authController.getProfile);

module.exports = router;
