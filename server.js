require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const routes = require("./routes");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const dbConnection = require("./database");
const cors = require("cors");
const jwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

const PORT = process.env.PORT || 3001;
const SESSION_KEY = process.env.SESSION_KEY || "not so secret key";

const app = express();

// Sessions
app.use(
  session({
    secret: SESSION_KEY, //random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false //required
  })
);

// Define middleware here
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// use JWT auth to secure the api
// app.use(jwt());

// global error handler
app.use(errorHandler);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Authentication Elements
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
