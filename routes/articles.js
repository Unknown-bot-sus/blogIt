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

router.route("").post(createArticle);

router.get("/:id/edit", editPage);

router.route("/:id/likes").post(like);

router.route("/:id").get(detailPage).put(editArtcile).delete(deleteArticle);

module.exports = router;
