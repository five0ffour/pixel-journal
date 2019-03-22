const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("../../passport");
const { User: db } = require("../../models");

const SECRET_KEY = process.env.JWT_SECRETKEY || JWT_SECRETKEY;

// POST("/api/auth") -- register a new user in the database if it is not a duplicate
// This post should remain open so we can add users freely, should not be secured by JWT or user authentication
router.post("/auth", (req, res) => {
  console.log("user signup");

  const { username, password, email, firstName, lastName } = req.body;

  // ADD VALIDATION -- error if user already exists
  db.User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.status(412).json({
        error: "Sorry, already a user with the username: ${username}"
      });
    } else {
      /* Unique user - add to the database */
      const newUser = new db.User({
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName
      });
      newUser.save((err, savedUser) => {
        if (err) {
          return res.status(412).json(err);
        }
        res.json(savedUser);
      });
    }
  });
});

// POST("/api/posts) - sample api to protect using JWT, does nothing but act as a template
// Note the verifyToken call
router.post("/posts", verifyToken, (req, res) => {
  res.json({
    message: "Posts created..."
  });
});

// POST(/api/login) - authenticate the user, if successful create a JWT for this user
router.route("/login").post(
  passport.authenticate("local"),
  (req, res) => {
    // Authenticate user against database
    console.log("logged in ", req.body.email);

    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };

    // get token asynchronously - expires in 1 day
    jwt.sign({ user }, SECRET_KEY, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        res.sendStatus(412);
      } else {
        res.json({ user, token });
      }
    });
  }
);

// VerifyToken() - validates the passed token against the secret key
// format of header/token:   Authorization:  Bearer <access_token>
function verifyToken(req, res, next) {
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(bearerToken, SECRET_KEY, (err, result) => {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
