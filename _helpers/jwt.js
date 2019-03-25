const expressJwt = require('express-jwt');
const userService = require('../services/userservice');

module.exports = jwt;

function jwt() {
    const secret = process.env.JWT_SECRETKEY || JWT_SECRETKEY;
    console.log("Called jwt() middleware with secret ", secret);
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/user/authenticate',
            '/api/user/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    console.log("Calling isRevoked()");
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};