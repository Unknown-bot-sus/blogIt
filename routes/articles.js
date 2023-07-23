const express = require("express");
const router = express.Router();
const {
  createArticle,
  deleteArticle,
  editArtcile,
  editPage,
} = require("../controllers/articles");

router.route("").post(createArticle);

router.get("/:id/edit", editPage);

router.route("/:id").put(editArtcile).delete(deleteArticle);

module.exports = router;
