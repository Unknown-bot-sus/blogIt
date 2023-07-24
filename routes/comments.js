const express = require("express");
const { createComment } = require("../controllers/comments");
const router = express.Router();

router.route("/").post(createComment);

module.exports = router;
