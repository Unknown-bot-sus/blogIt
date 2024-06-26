const { StatusCodes } = require("http-status-codes");

function createComment(req, res) {
  const data = req.body;
  db.get(
    "INSERT INTO COMMENTS(comment, articleId, userId) VALUES (?, ?, ?) RETURNING *",
    [data.comment, data.articleId, req.session.user.id ?? null],
    (err, comment) => {
      res.status(StatusCodes.CREATED).send({
        comment,
      });
    }
  );
}

module.exports = {
  createComment,
};
