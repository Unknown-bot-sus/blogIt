const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
      } else {
        res.redirect("/auth/login");
      }
}

const isAuthorizedAuthor = (req, res, next) => {
  db.get("SELECT * FROM Authors WHERE userId = ? AND id = ?", [
    req.session.user.id, req.params.id
  ], (err, author) => {
    if (author) {
      next();
    } else {
      res.redirect("/auth/login");
    }
  })
}

module.exports = {
    isAuthenticated,
    isAuthorizedAuthor
}