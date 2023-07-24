require("dotenv").config(); // load environments variables into process.env

module.exports.PORT = process.env.PORT || 3000;
module.exports.SECRET = process.env.SECRET || "password";