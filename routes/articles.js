const express = require("express");
const router = express.Router();
const {
  createArticle,
  deleteArticle,
  editArtcile,
  editPage,
  detailPage,
} = require("../controllers/articles");

router.route("").post(createArticle);

router.get("/:id/edit", editPage);

router.route("/:id").get(detailPage).put(editArtcile).delete(deleteArticle);

module.exports = router;
