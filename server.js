const express = require("express");
const { connect } = require("./utils/database");
const { PORT } = require("./config/constant");
const path = require("path");
const userRoutes = require("./routes/user");

const app = express();
//set the app to use ejs for rendering
app.set("view engine", "ejs");

// expose the css file from dist folder
app.use(express.static(path.join(__dirname, "dist")));

// configure routes
app.use("/user", userRoutes); //this adds all the userRoutes to the app under the path /user

module.exports.start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};
