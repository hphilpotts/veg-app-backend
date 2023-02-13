const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// let passport = require("../helper/ppConfig");
const salt = 10;

exports.auth_signup = (req, res) => {
    let user = new User(req.body);
    console.log(req.body);
    console.log(req.body.password)
    // encrypting password in database
    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);
    user.password = hash;
    user.save()
    .then(()=> {
        // res.send("Successfully created new user")
        res.json({"message": "User created sucessfully!"})
    })
    .catch((err)=> {
        console.log(err);
        // res.send("try again later")
        res.json({"message": "error creating user, try again!"})
    })
}

exports.auth_signin = async(req, res) => {
    let {emailAddress, password} = req.body;
    console.log(emailAddress)
        try{
        let user = await User.findOne({emailAddress}) //emailAddress: emailAddress
        console.log(user)
        if(!user)
        {
            return res.json({ "message": "User not found"}).status(400)
        }
        // Password Comparison
        const isMatch = await bcrypt.compareSync(password, user.password)
        console.log(password) //plain text password
        console.log(user.password) //encrypted password from database
        if(!isMatch){
            return res.json({"message": "Password Not Matched"}).status(400)
        }
        //JWT TOKEN
        const payload = {
            user:{
                id: user._id,
                username: user.userName
            }
        }
        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 360000000000000},
            (err, token) => {
                if(err) throw err;
                res.json({token}).status(200)
             }
        )
    }
    catch(error){
        console.log(error)
        res.json({"message": "you are not logged in!"}).status(400)
    }
}