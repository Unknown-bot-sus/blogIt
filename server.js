const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { connect } = require("./utils/database");
const { PORT } = require("./config/constant");
const path = require("path");
const userRoutes = require("./routes/user");
const authorRoutes = require("./routes/authors");

const app = express();
//set the app to use ejs for rendering
app.set("view engine", "ejs");
app.set("layout", "layouts/index.ejs");
app.use(expressLayouts);
// expose the css file from dist folder
app.use(express.static(path.join(__dirname, "dist")));

// configure routes
app.use("/user", userRoutes); //this adds all the userRoutes to the app under the path /user
app.use("/authors", authorRoutes);

module.exports.start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};
