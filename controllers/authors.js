const { StatusCodes } = require("http-status-codes");

function homePage(req, res) {
  db.get(
    "SELECT Authors.*, Users.* FROM Authors INNER JOIN Users ON  Authors.userId = Users.id WHERE Authors.id = ?",
    [req.params.id],
    (err, user) => {
      db.all(
        `
        SELECT Articles.*, Likes.likes FROM
        (SELECT * FROM Articles WHERE authorId = ?) AS Articles INNER JOIN 
        (SELECT COUNT(id) as likes, articleId FROM Likes GROUP BY articleId) AS Likes ON
        Articles.id = Likes.articleId
        `,
        [req.params.id],
        (err, articles) => {
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
    }
  );
}

function settingsPage(req, res) {
  db.get(
    "SELECT Authors.*, Users.* FROM Authors INNER JOIN Users ON  Authors.userId = Users.id WHERE Authors.id = ?",
    [req.params.id],
    (err, user) => {
      res.render("authors/settings", {
        title: "Settings",
        user,
      });
    }
  );
}

function putAuthor(req, res) {
  const user = req.body;
  db.get(
    "UPDATE Authors SET title = ?, subtitle = ? WHERE id = ? RETURNING userId",
    [user.title, user.subtitle, req.params.id],
    (err, author) => {
      db.run(
        "UPDATE Users SET name = ? WHERE id = ?",
        [user.name, author.userId],
        (err) => {
          res.status(StatusCodes.NO_CONTENT).send();
        }
      );
    }
  );
}

module.exports = {
  homePage,
  settingsPage,
  putAuthor,
};
