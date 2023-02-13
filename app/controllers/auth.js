const User = require("../models/User");

exports.auth_signup_get = (req, res) => {
    res.json({"response": "this is the auth get"});
}