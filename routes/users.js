const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');


const User = require('../models/user');

//  Register
router.post('/register', (request, response, next) => {
    let newUser = new User({
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        alias: request.body.alias,
        password: request.body.password
    });

    User.addUser(newUser, (error, user) => {
        if (error) {
            response.send({success: false, msg: 'Failed to register user'});
        } else {
            response.send({success: true, msg: 'User registered'});
        }
    });
});

// Login
router.post('/login', (request, response, next) => {
    let alias = request.body.alias;
    let password = request.body.password;

    User.getUserByAlias(alias, (error, user) => {
        if (error) {
            throw error;
        }

        if (!user) {
            return response.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (error, match) => {
            if (error) {
                throw error;
            }

            if (match) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // Expires 1 week, user needs to sign in again
                });

                response.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        alias: user.alias
                    }
                })

            } else {
                return response.json({success: false, msg: 'Wrong password'});
            }
        })

    })
});

module.exports = router;