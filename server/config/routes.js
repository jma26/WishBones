const Users = require('../controllers/users.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function(app) {
    // Create a new user
    app.post('/registration', function(request, response) {
        console.log('Creating new user, @routes.js pinging');
        Users.create(request, response);
    })
    // Retrieving user for validation
    app.get('/login', function(request, response) {
        console.log('Retrieving user for validation, @routes.js pinging');
        Users.retrieve(request, response);
    })
}