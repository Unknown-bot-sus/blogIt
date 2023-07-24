// needed to make error handling works
require("express-async-errors");
const express = require("express");
const expressSession = require("express-session")
const expressLayouts = require("express-ejs-layouts");
const { connect } = require("./utils/database");
const { PORT, SECRET } = require("./config/constant");
const path = require("path");
const userRoutes = require("./routes/user");
const authorRoutes = require("./routes/authors");
const articleRoutes = require("./routes/articles");
const readerRoutes = require("./routes/reader");
const commentRoutes = require("./routes/comments");
const authRoutes = require("./routes/auth")

const { errorHandler } = require("./middleware/error-handler");

const app = express();

//set the app to use ejs for rendering
app.set("view engine", "ejs");
app.set("layout", "layouts/index.ejs");
app.use(expressLayouts);
// expose the css file from dist folder
app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json());
app.use(expressSession({
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1 * 1000 * 60 * 60, // 1 hour in milliseconds
    secure: false // since we are using localhost 
  }
}))


app.use("/auth", authRoutes);
// configure routes
app.use("/user", userRoutes); //this adds all the userRoutes to the app under the path /user
app.use("/authors", authorRoutes);
app.use("/articles", articleRoutes);
app.use("/comments", commentRoutes);
app.use("/", readerRoutes);
// added errorHandler middleware
app.use(errorHandler);

module.exports.start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};
