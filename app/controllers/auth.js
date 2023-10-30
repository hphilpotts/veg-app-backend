const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const salt = 10;

exports.auth_signup = async (req, res) => {

    const { userName, emailAddress, password } = req.body;

    try {
        existingUser = await User.findOne({ emailAddress });
        if (existingUser) {
            return res.status(400).json({ "message": 'Email already exists' });
        }

        existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ "message": 'Username already in use' });
        }

        if (password.length < 6) {
            return res.status(400).json({ "message": 'Password should be 6 characters or longer' });
        }

        const user = new User({
            userName,
            emailAddress,
            password,
        });

        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        user.password = hashedPassword;

        await user.save()
            .then(() => {
                res.status(201).json({ body: user, "message": "User created sucessfully!" });
            })
            .catch((err) => {
                console.log(err);
                res.json({ "message": "error creating user, try again!" });
            })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

}

exports.auth_signin = async (req, res) => {
    const { emailAddress, password } = req.body;
    try {
        const user = await User.findOne({ emailAddress });
        if (!user) {
            return res.status(400).json({ "message": "User not found" });
        }
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ "message": "Password does not match user" });
        }

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
                res.status(200).json({ token, body: user.username, "message": "login successful!" });
            }
        );

    }
    catch (error) {
        res.status(400).json({ "message": "you are not logged in!" });
        console.log(error);
    }
}