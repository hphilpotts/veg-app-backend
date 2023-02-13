const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Your password is too short"],
        unique: false,
    },
},
    {
        timestamps: true,
        collecion: 'users'
    });


userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;