const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// let passport = require("../helper/ppConfig");
const salt = 10;

exports.auth_signup = (req, res) => { // TODO - update to include more specific error handling
    let user = new User(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt);
    user.password = hash;
    user.save()
        .then(() => {
            res.json({ "message": "User created sucessfully!" })
        })
        .catch((err) => {
            console.log(err);
            res.json({ "message": "error creating user, try again!" })
        })
}

exports.auth_signin = async (req, res) => { // TODO - update to include more specific error handling
    let { emailAddress, password } = req.body;
    try {
        let user = await User.findOne({ emailAddress });
        if (!user) {
            return res.json({ "message": "User not found" }).status(400)
        }
        const isMatch = await bcrypt.compareSync(password, user.password)
        if (!isMatch) {
            return res.json({ "message": "Password Not Matched" }).status(400)
        }
        const payload = {
            user: {
                id: user._id,
                username: user.userName
            }
        }
        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 360000000000000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token }).status(200)
            }
        )
    }
    catch (error) {
        res.json({ "message": "you are not logged in!" }).status(400);
        console.log(error);
    }
}