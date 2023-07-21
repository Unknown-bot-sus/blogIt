const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

router.route("").post((req, res) => {
  const { article, user } = req.body;
  db.get(
    `INSERT INTO Articles (title, subtitle, content) VALUES(?, ?, ?) RETURNING *`,
    [article.title, article.subtitle, article.content],
    (err, article) => {
      db.run(
        "INSERT INTO Contributors (articleId, authorId) VALUES(?, ?)",
        [article.id, user.id],
        (err) => {
          res.status(StatusCodes.OK).send(article);
        }
      );
    }
  );
});
module.exports = router;
