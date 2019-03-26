const expressJwt = require('express-jwt');
const userService = require('../services/userservice');

module.exports = jwt;

function jwt() {
    const secret = process.env.JWT_SECRETKEY || JWT_SECRETKEY;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/user/authenticate',
            '/api/user/register',
            '/api/login',
            '/api/auth',
            '/api/logout'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};