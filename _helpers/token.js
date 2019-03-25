const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRETKEY || JWT_SECRETKEY;

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

module.exports = verifyToken;
