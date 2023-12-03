const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const salt = 10;

exports.auth_signup = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ "message": 'Email already exists' });
        };

        existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ "message": 'username already in use' });
        };

        if (password.length < 6) {
            return res.status(400).json({ "message": 'Password should be 6 characters or longer' });
        };

        const newUser = new User({
            username,
            email,
            password,
        });

        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        newUser.password = hashedPassword;

        await newUser.save()
            .then(() => {
                res.status(201).json({ body: newUser, "message": "User created sucessfully!" });
            })
            .catch((error) => {
                console.error(error);
                res.status(400).json({ "message": "error creating user, try again!" });
            });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    };

};

exports.auth_signin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ "message": "User not found, please check email address and try again." });
        };

        const passwordMatchToEmail = bcrypt.compareSync(password, user.password);
        if (!passwordMatchToEmail) {
            return res.status(400).json({ "message": "Password and email do not match, please try again." });
        };

        const payload = {
            user: {
                id: user._id,
                username: user.username
            }
        };

        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: '3 days' },
            (error, token) => {
                if (error) throw error;
                res.status(200).json({ token, body: user, "message": "Login successful!" });
            }
        );

    } catch (error) {
        res.status(400).json({ "message": "you are not logged in!" });
        console.log(error);
    };
    
};