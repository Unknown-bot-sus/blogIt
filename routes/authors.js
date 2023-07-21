const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

router.route("/:id").get((req, res) => {
  db.all("SELECT * FROM Users WHERE id = ?", [req.params.id], (err, user) => {
    db.all(
      "SELECT Articles.* FROM Articles INNER JOIN Contributors ON Articles.id = Contributors.articleId AND Contributors.authorId = ?",
      [req.params.id],
      (err, articles) => {
        console.log(articles);
        const { publishedArticles, unpublishedArticles } = articles.reduce(
          (accumulator, article) => {
            if (article.publication_date !== null) {
              accumulator.publishedArticles.push(article);
            } else {
              accumulator.unpublishedArticles.push(article);
            }

            return accumulator;
          },
          {
            publishedArticles: [],
            unpublishedArticles: [],
          }
        );
        res.status(StatusCodes.OK).render("authors/index", {
          title: "Home",
          user,
          articles: unpublishedArticles,
          publishedArticles,
        });
      }
    );
  });
});

module.exports = router;
