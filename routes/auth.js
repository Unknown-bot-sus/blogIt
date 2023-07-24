const express = require("express");
const { register, registerPage, loginPage, login } = require("../controllers/auth");
const router = express.Router();

router.route("/register").get(registerPage).post(register);
router.route("/login").get(loginPage).post(login)

module.exports = router;
