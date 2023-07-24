const express = require("express");
const router = express.Router();
const {
  createArticle,
  deleteArticle,
  editArtcile,
  editPage,
  detailPage,
  like,
} = require("../controllers/articles");
const { isAuthenticated, isAuthorizedAuthor } = require("../middleware/auth");

router.route("").post(isAuthenticated, isAuthorizedAuthor, createArticle);

router.get("/:id/edit", isAuthenticated, isAuthorizedAuthor, editPage);

router.route("/:id/likes").post(like);

router.route("/:id").get(detailPage).put(isAuthenticated, isAuthorizedAuthor, editArtcile).delete(isAuthenticated, isAuthorizedAuthor, deleteArticle);

module.exports = router;
