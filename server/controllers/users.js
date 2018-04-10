const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

module.exports = {
    create: function(request, response) {
        console.log(request.body);
        let hashedPassword;
        let unhashedPassword = request.body.password;

        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(unhashedPassword, salt, (error, hash) => {
                if (error) {
                    response.json('Password is empty');
                } else {
                    hashedPassword = hash;

                    let user = new User({first_name: request.body.fname, last_name: request.body.lname, alias: request.body.alias, email: request.body.email, password: hashedPassword });

                    user.save(function(error, result) {
                        if (error) {
                            console.log('Unsuccessful User Creation');
                            response.json(error);
                        } else {
                            console.log('Successful User Creation');
                            User.find({"email": user.email}, function(error, result) {
                                if (error) {
                                    response.json(error);
                                } else {
                                    response.json(result);
                                }
                            })
                        }
                    })
                    console.log(hashedPassword);
                }
            })
        })
    },
    login: function(request, response) {
        console.log('users.js @controllers detected ', request.body);
        // Find login information from db
        User.findOne({"email": request.body.email}, function(error, result) {
            if (error) {
                response.json('Email not found');
            } else {
                // If email does not exist, result will be null or length of 0 (empty)
                if (result === null || result.length === 0) {
                    response.json({success: false, message: 'Email not found'});
                // If email exists, run bcrypt compare
                } else {
                    bcrypt.compare(request.body.password, result.password, function(error, boolean) {
                        if (error) {
                            response.json('Password does not match');
                        } else {
                            response.json({success: boolean, profile: result});
                        }
                    })
                }
            }
        })
    }
}