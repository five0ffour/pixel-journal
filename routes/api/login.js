const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("../../passport");
const { User: db } = require("../../models");
const verifyToken = require("../../helpers/token");
const userCtlr = require("../../controllers/userController");

const SECRET_KEY = process.env.JWT_SECRETKEY || "not so secret key";

// POST("/api/auth") -- register a new user in the database if it is not a duplicate
// This post should remain open so we can add users freely, should not be secured by JWT or user authentication
router.route("/auth").post((req, res, next) => {
  console.log("user signup");
  userCtlr.register(req, res, next);
});

// POST(/api/login) - authenticate the user, if successful create a JWT for this user
router
  .route("/login")
  .post(passport.authenticate("local"), (req, res, next) => {
    console.log("logged in ", req.body.email);
    return res.json(req.user);
  });

router.route("/logout").post((req, res, next) => {
  console.log("logging out ", req.body.username);
  // TODO: Expire the cache entry
  return res.json({});
});

module.exports = router;
