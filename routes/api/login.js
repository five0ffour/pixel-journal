const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("../../passport");
const { User: db } = require("../../models");
const verifyToken = require("../../passport/util");

const SECRET_KEY = process.env.JWT_SECRETKEY || JWT_SECRETKEY;

// POST("/api/auth") -- register a new user in the database if it is not a duplicate
// This post should remain open so we can add users freely, should not be secured by JWT or user authentication
router.route("/auth").post((req, res) => {
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
router.route("/posts").post(verifyToken, (req, res) => {
  res.json({
    message: "Posts created..."
  });
});

// POST(/api/login) - authenticate the user, if successful create a JWT for this user
router.route("/login").post(passport.authenticate("local"), (req, res) => {
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
      res.json({ token });
    }
  });
});

module.exports = router;
