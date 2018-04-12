const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
    fullName: { type: String, required: [true, 'First name is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    alias: { type: String, required: [true, 'Alias is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'], minlength: [5, 'Password must be at least 5 characters long']}
});

let User = mongoose.model('User', UserSchema);

// // addUser - Register New User
// module.exports.addUser = function(newUser, callback) {
//     bcrypt.genSalt(10, (error, salt) => {
//         bcrypt.hash(newUser.password, salt, (error, hash) => {
//             if (error) {
//                 throw error;
//             }
//             newUser.password = hash;
//             newUser.save(callback);
//         });
//     })
// }

// // getUserByAlias- Retrieve User
// module.exports.getUserByAlias = function(alias, callback) {
//     // let query = {alias: alias};
//     User.findOne({alias: alias}, callback);
// }

// // Authenticate password
// module.exports.comparePassword = function(passwordInput, hash, callback) {
//     bcrypt.compare(passwordInput, hash, (error, match) => {
//         if (error) {
//             throw error;
//         }
//         callback(null, match);
//     });
// }

// 