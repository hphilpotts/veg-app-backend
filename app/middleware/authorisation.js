const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');
    const userOwner = req.body.userOwner;

    if (!token) {
        return res.status(401).json({ "message": 'No token found, authorisation denied' });
    }
    
    try {

        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token provided is not valid, authorisation denied' });
            } else {
                req.user = decoded.user;
            }
        })

        if (req.user.id === userOwner) {
            next();
        } else {
            return res.status(401).json({ msg: 'User making request does not match document userOwner' });
        }

    } catch (err) {

        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });

    }

}