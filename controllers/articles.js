const { StatusCodes } = require("http-status-codes");

function deleteArticle(req, res) {
  db.run(
    "DELETE FROM Contributors WHERE articleId = ?",
    [req.params.id],
    (err) => {
      db.run("DELETE FROM Articles WHERE id = ?", [req.params.id], (err) => {
        res.status(StatusCodes.NO_CONTENT).send();
      });
    }
  );
}
function createArticle(req, res) {
  const { article, author } = req.body;
  db.get(
    `INSERT INTO Articles (title, subtitle, content, authorId) VALUES(?, ?, ?, ?) RETURNING *`,
    [article.title, article.subtitle, article.content, author.id],
    (err, article) => {
      res.status(StatusCodes.OK).send(article);
    }
  );
}

function editArtcile(req, res) {
  const article = req.body;
  if (article.publish) {
    db.run(
      "UPDATE Articles SET publication_date = ? WHERE id = ?",
      [new Date().toUTCString(), req.params.id],
      (err) => {
        res.status(StatusCodes.NO_CONTENT).send();
      }
    );
  } else {
    db.run(
      "UPDATE Articles SET title = ?, subtitle = ?, content = ? WHERE id = ?",
      [article.title, article.subtitle, article.content, req.params.id],
      (err) => {
        res.status(StatusCodes.NO_CONTENT).send();
      }
    );
  }
}

function editPage(req, res) {
  db.get(
    "SELECT * FROM Articles WHERE id = ?",
    [req.params.id],
    (err, article) => {
      res.render("articles/edit", {
        title: "Edit article",
        article,
      });
    }
  );
}

module.exports = {
  createArticle,
  editArtcile,
  editPage,
  deleteArticle,
};
