const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ "message": 'No token found, authorisation denied.' });
    };

    try {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ "message": 'Token provided is not valid, authorisation denied.' });
            } else {
                req.user = decoded.user;
                next();
            }
        });

    } catch (error) {

        console.error('something wrong with auth middleware');
        console.error(error);
        res.status(500).json({ "message": 'Server Error' });

    };
};