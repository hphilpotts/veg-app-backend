module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ "message": 'No token found, authorisation denied' });
    }

    try {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ "message": 'Token provided is not valid, authorisation denied' });
            } else {
                req.user = decoded.user;
                next();
            }
        });

    } catch (err) {

        console.error('something wrong with auth middleware');
        res.status(500).json({ "message": 'Server Error' });

    }
};