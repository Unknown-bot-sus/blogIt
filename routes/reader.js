const express = require("express");
const { homePage } = require("../controllers/reader");
const router = express.Router();

router.route("/").get(homePage);

module.exports = router;
