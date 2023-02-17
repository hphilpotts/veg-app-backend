const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;

exports.auth_signup = async (req, res) => {

    // TODO - handle further password restrictions in frontend

    const { userName, emailAddress, password } = req.body;

    try {
        existingUser = await User.findOne({ emailAddress }); // TODO - refactor and/or abstract these checks
        if (existingUser) {
            return res.status(400).json({ "message": 'Email already exists' });
        }

        existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ "message": 'Username already in use' });
        }

        if (password.length < 6) {
            return res.status(400).json({ "message": 'Password should be 6 characters or longer' })
        }

        user = new User({
            userName,
            emailAddress,
            password,
        });

        let hashedPassword = bcrypt.hashSync(req.body.password, salt);
        user.password = hashedPassword;

        await user.save()
            .then(() => {
                res.json({ "message": "User created sucessfully!" })
            })
            .catch((err) => {
                console.log(err);
                res.json({ "message": "error creating user, try again!" }) // ? more specific error message/error handling here ?
            })

        // TODO - abstract out token creation
        const payload = {
            user: {
                id: user._id,
                username: user.userName
            }
        };

        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: '3 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

}

exports.auth_signin = async (req, res) => {
    let { emailAddress, password } = req.body;
    try {
        let user = await User.findOne({ emailAddress });
        if (!user) {
            return res.json({ "message": "User not found" }).status(400)
        }
        const isMatch = await bcrypt.compareSync(password, user.password)
        if (!isMatch) {
            return res.json({ "message": "Password does not match user" }).status(400)
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
            { expiresIn: '3 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token }).status(200)
            }
        )
    }
    catch (error) {
        res.json({ "message": "you are not logged in!" }).status(400); // ? more specific error here ?
        console.log(error);
    }
}