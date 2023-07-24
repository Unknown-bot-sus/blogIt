const { StatusCodes } = require("http-status-codes");
const convertToISO = require('../utils/convertToIso');
const timeSince = require('../utils/timeSince');

function deleteArticle(req, res) {
  db.run("DELETE FROM Comments WHERE articleId = ?", [req.params.id], (err) => {
    db.run("DELETE FROM Likes WHERE articleId = ?", [req.params.id], (err) => {
      db.run("DELETE FROM Articles WHERE id = ?", [req.params.id], (err) => {
        console.log(err);
        res.status(StatusCodes.NO_CONTENT).send();
      });
    });
  });
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
        convertToISO,
        timeSince,
      });
    }
  );
}

function detailPage(req, res) {
  db.get(
    `
SELECT Articles.*, IFNULL(Likes.likes, 0) AS likes FROM
(SELECT * FROM Articles WHERE id = $id) AS Articles LEFT JOIN 
(SELECT COUNT(id) as likes, articleId FROM Likes WHERE articleId = $id GROUP BY articleId) AS Likes ON
Articles.id = Likes.articleId
;  
`,
    {
      $id: req.params.id,
    },
    (err, article) => {
      db.all(
        `
SELECT * FROM Comments LEFT JOIN Users ON Comments.userId = Users.id WHERE Comments.articleId = $articleId ORDER BY Comments.created_at DESC`,
        {
          $articleId: req.params.id,
        },
        (err, comments) => {
          console.log(comments);
          res.render("articles/detail", {
            title: "Article",
            article,
            comments,
          });
        }
      );
    }
  );
}

function like(req, res) {
  const data = req.body;
  if (!req.session.user) {
    return res.status(StatusCodes.UNAUTHORIZED).send()
  }
  db.get("SELECT * FROM Likes WHERE articleId = ? AND userId = ?", [
    data.articleId, req.session.user.id
  ], (err, like) =>{
    if (like) {
      db.run("DELETE FROM Likes WHERE id = ?", [
        like.id
      ], (err) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }

        res.status(StatusCodes.NO_CONTENT).send();
      })
    } else {
      db.run(
        "INSERT INTO Likes (articleId, userId) VALUES (?, ?)",
        [data.articleId, req.session.user?.id ?? null],
        (err) => {
          res.status(StatusCodes.NO_CONTENT).send();
        }
      );
    }
  })
}

module.exports = {
  createArticle,
  editArtcile,
  editPage,
  detailPage,
  deleteArticle,
  like,
};
