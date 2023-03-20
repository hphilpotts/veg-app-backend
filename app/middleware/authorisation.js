const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    console.log(req.body);

    const token = req.header('x-auth-token');
    const userOwner = req.body.userOwner;

    if (!token) {
        return res.status(401).json({ "message": 'No token found, authorisation denied' });
    }

    try {

        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ "message": 'Token provided is not valid, authorisation denied' });
            } else {
                req.user = decoded.user;
            }
        })

        console.log('middleware is comparing the req.user.id to the Week user owner:');
        console.log(req.user.id, userOwner)

        if (req.user.id === userOwner) {
            next();
        } else {
            return res.status(403).json({ "message": 'Authorisation denied, user making request is not permitted access.' });
        }

    } catch (err) {

        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });

    }

}