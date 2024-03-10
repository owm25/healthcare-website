
// script.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    // I will send these values to your server here
});
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Here you would connect to your database
// const db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Here you would check the email and password against your database
    // const user = db.getUser(email, password);
    // if (user) {
    //     res.send('Logged in!');
    // } else {
    //     res.send('Invalid email or password.');
    // }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
