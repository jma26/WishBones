const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    alias: { type: String, required: true },
    password: { type: String, required: true }
});

// Exporting User
const User = module.exports = mongoose.model('User', UserSchema);
// const User = mongoose.model('User', UserSchema);

// addUser - Register New User
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) {
                throw error;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    })
}

// getUserByAlias- Retrieve User
module.exports.getUserByAlias = function(alias, callback) {
    // let query = {alias: alias};
    User.findOne({alias: alias}, callback);
}

// Authenticate password
module.exports.comparePassword = function(passwordInput, hash, callback) {
    bcrypt.compare(passwordInput, hash, (error, match) => {
        if (error) {
            throw error;
        }
        callback(null, match);
    });
}