const express = require("express");
const router = express.Router();
const { homePage, settingsPage, putAuthor } = require("../controllers/authors");
const { isAuthenticated, isAuthorizedAuthor } = require("../middleware/auth");

router.get("/:id/settings", isAuthenticated, isAuthorizedAuthor, settingsPage);

router.route("/:id").get(isAuthenticated, isAuthorizedAuthor, homePage).put(isAuthenticated, isAuthorizedAuthor, putAuthor);

module.exports = router;
