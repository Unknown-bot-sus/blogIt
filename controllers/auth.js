const { genSalt, hash, compare} = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
function login (req, res, next) {
    const { password, name } = req.body;
    db.get("SELECT password, id FROM Users WHERE name = ?", [name], (err, user) => {
        if (!user) {
            res.send(StatusCodes.BAD_REQUEST).send({ message: "Invalid credentials"});
        }
        const hashedPassword = user.password; // get hashedPassword from database
            // Compare the provided password with the hashed password
        compare(password, hashedPassword, (err, result) => {
        if (result || password === hashedPassword) {
          req.session.user = {
            id: user.id
          };
          req.session.save((err) => {
            if (err) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Login Failed"});
            }
            res.status(StatusCodes.OK).send()
          })
        } else {
            res.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid credentials"});

        }
      });
    })

  };

async function register(req, res) {
    const {name, password} = req.body;
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    db.get("SELECT name FROM Users WHERE name = ?", [name], (err, user) => {
        if (user) {
           return res.status(StatusCodes.BAD_REQUEST).send({
            message: "Name already taken",
           })
        }

        db.get("INSERT INTO USERS (name, password) VALUES (?, ?) RETURNING *", [
            name, hashPassword
        ], (err, user) => {
            res.status(StatusCodes.CREATED).send({
                user
            })
        })
    })

}

function loginPage(req, res) {
    res.render("auth/login.ejs", {
        title: "Login"
    })
}

function registerPage(req, res) {
    res.render("auth/register.ejs", {
        title: "Register"
    });
}

module.exports = {
    login,
    register,
    loginPage,
    registerPage
}