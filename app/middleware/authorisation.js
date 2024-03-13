const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');
    const user = (req.body.user) ? req.body.user : req.query.userId;

    if (!token) {
        return res.status(401).json({ "message": "No token found, authorisation denied" });
    };

    try {

        jwt.verify(token, process.env.SECRET, (error, decoded) => {

            if (error) {
                return res.status(401).json({ "message": "Token provided is not valid, authorisation denied" });
            } else {
                req.user = decoded.user;
            };

        });

        if (req.user.id === user) {
            next();
        } else {
            return res.status(403).json({ "message": "Authorisation denied, user making request is not permitted access." });
        };

    } catch (error) {

        console.error(error);
        res.status(500).json({ "message": "Server error (authorisation middleware)." });

    };

};