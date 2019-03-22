const { User: db } = require("../models");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
    {
        usernameField: "username", // not necessary, DEFAULT
    },
    function(username, password, done) {
        console.log("LocalStrategy - finding username");
        db.User.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log("LocalStrategy - general err");
                return done(err);
            }
            if (!user) {
                console.log("LocalStrategy - incorrect username");
                return done(null, false, { message: "Incorrect username" });
            }
            if (!user.checkPassword(password)) {
                console.log("LocalStrategy - incorrect password");
                return done(null, false, { message: "Incorrect password" });
            }
            console.log("LocalStrategy - success!")
            return done(null, user);
        });
    }
);

module.exports = strategy;
