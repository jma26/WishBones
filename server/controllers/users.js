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
                            User.find({}, function(error, result) {
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
    retrieve: function(request, response) {
        console.log(request.body);
    }
}

// let user = new User({first_name: request.body.fname, last_name: request.body.lname, alias: request.body.alias, email: request.body.email, password: hashedPassword });
// user.save(function(error, result) {
//     if (error) {
//         console.log('Unsuccessful User Creation');
//         response.json(error);
//     } else {
//         console.log('Successful User Creation');
//         User.find({}, function(error, result) {
//             if (error) {
//                 response.json(error);
//             } else {
//                 response.json(result);
//             }
//         })
//     }
// })