const router = require("express").Router();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRETKEY || JWT_SECRETKEY;

// POST("/api/posts) - sample api to protect using JWT, does nothing but act as a template
router.post("/posts", verifyToken, (req, res) => {
  res.json({
    message: "Posts created...",
  });
});

// POST(/api/login) - get login token
router.route("/login").post((req, res) => {
  // Authenticate user against database here,  but mock it up for now
  const user = {
    id: 1,
    username: "Mike",
    email: "mbgalarneau@gmail.com"
  };

  // get token asynchronously - expires in 1 day
  jwt.sign({ user }, SECRET_KEY, { expiresIn: "1d" }, (err, token) => {
    res.json({ token });
  });
});

// Verify token
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
