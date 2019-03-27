const { User: db } = require("../models");
const LocalStrategy = require("passport-local").Strategy;
const userService = require("../services/userservice");

const strategy = new LocalStrategy(
  {
    usernameField: "username" // not necessary, DEFAULT
  },
  async function(username, password, done) {
    console.log("LocalStrategy - finding username", username);
    const user = await userService.authenticate({ username, password });
    if (!user) {
      console.log("LocalStrategy - incorrect username/password");
      return done(null, false, { message: "Incorrect username/password" });
    }
    console.log("LocalStrategy - success!");
    return done(null, user);
  }
);

module.exports = strategy;
