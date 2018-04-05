const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${config.database}`);
});

// On Error
mongoose.connection.on('error', () => {
    console.log('Database error:' + err);
});

// Initialize express
const app = express();

// Port Number
const port = 8000;

const users = require('./routes/users');

// Body Parser Middleware
app.use(bodyParser.json());

// Set Static Folder to Public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

// Index route
app.get('/', (request, response) => {
    response.send('Hello World');
})

// Start Server
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})