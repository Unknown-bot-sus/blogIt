const timeSince = require("../utils/timeSince");
const convertToISO = require('../utils/convertToIso')

function homePage(req, res) {
  db.all("SELECT * FROM Authors", (err, authors) => {
    db.all(
      `
      SELECT Articles.*, IFNULL(Likes.likes, 0) AS likes FROM
      (SELECT * FROM Articles WHERE publication_date IS NOT NULL) AS Articles LEFT JOIN 
      (SELECT COUNT(id) as likes, articleId FROM Likes GROUP BY articleId) AS Likes ON
      Articles.id = Likes.articleId ORDER BY Articles.publication_date DESC
      `,
      (err, articles) => {
        res.render("reader/index", {
          title: "Reader Page",
          authors,
          articles,
          timeSince,
          convertToISO
        });
      }
    );
  });
}

module.exports = {
  homePage,
};
