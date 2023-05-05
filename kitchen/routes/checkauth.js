const jwt = require('jsonwebtoken');

const User = require("../models/user");

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const checkAuthorization = function (req, res, next) {  
    const userJWT = req.headers.authorization
    if (!userJWT) {
        res.status(401).send('Invalid or missing authorization token');
    }
    else {
        const userJWTPayload = jwt.verify(userJWT, JWT_SECRET);
        if (!userJWTPayload) {
            res.status(401).send('Invalid or missing authorization token')
        }
        else {
            User.findOne({'spotifyAccessTokenHash': userJWTPayload.spotifyAccessTokenHash})
                .then(function (user) {
                    if (!user) {
                        res.status(401).send('User not currently logged in')
                    }
                    else {
                        req.user = user
                        next()
                    }
                })
        }
    }
}

module.exports = checkAuthorization