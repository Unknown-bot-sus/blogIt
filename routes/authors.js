const express = require("express");
const router = express.Router();
const { homePage, settingsPage, putAuthor } = require("../controllers/authors");
router.get("/:id/settings", settingsPage);

router.route("/:id").get(homePage).put(putAuthor);

module.exports = router;
