// Author(s): John McRea and Juan Martinez(Supervisor)
// Cred: wbpreal@proton.me & jmartinez26@madisoncollege.edu
// Currently Under Construction. Phase 1 of Honors Project Started Spring 2024
// app.js
// Setting up Express and required modules
const express =
require('express');
const bodyParser =
require('body-parser');
const session =
require('express-session');
const bcrypt =
require('bcrypt');
const http = require('http');
const https =
require('https');
const fs = require('fs');
const mongoose =
require('mongoose')

const app = express()
const httpPort = 3000;
const httpsPort = 3443;

//Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dentalOffice',
{ useNewUrlParser: true,
useUnifiedTopology: true});
// User Account Types or Schema
const userSchema = newmongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    dob: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    insurance: String,
    accountType: String
});

const User = mongoose.model('User', userSchema);

// Middleware Setup
app.use(bodyParser.urlencoded
({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true        
}));

// Redirect all HTTP requests to HTTPS
app.use((req, res, next) => { 

    if (req.secure) {
        next();

    } else {
        const redirectUrl = 'https://' 
+ req.headers.host.replace(`${httpPort}
`, `${httpsPort}`) + req.url;

        res.redirect(redirectUrl); 
    }
});



// Welcome Page with Login Form (creating a dropdown menu with more options)
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to Our Private Dental Office</h1>

        <p>Our mission is to provide high quality dental care with a personal touch.</p>

        <h2>Login</h2>

        <form action="/login" method="post">

            <label for="username">Username:</label>

            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label>

            <input type="password" id="password" name="password" required>

            <buttontype="submit">Login</button>
        </form>
        
        <p>Don't have an account? <a href="/register">Register Here</a></p>
    `);            
});

//Login Handler
app.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (user[username] &&

bcrypt.compareSync(password, user[username].password)) {

req.session.authenticated =

true; 
        req.session.username = username;

        res.redirect('/dashboard');

    } else {

        res.send('Invalid username or password. Please try again.');
    }   
});
// Registration Page
app.get('/register', (req, res) => {

    res.send(`

        <h2>Registration</h2>
        
        <form action="/register" method="post">

            <label for="username">Username:</label>

            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label>

            <input type="password" id="password" name="password" required>

            <label for="pin">Enter PIN provided by your Dentist:</label>

            <input type="text" id="pin" name="pin" required>

            <button type="submit">Register</button>

        </form>
    `);
});

// Registration Handler
app.post('/register', (req, res) => {

    const { username, password, pin } = req.body;        

    if (pin === doctorPIN) {

        const hashedPassword = bcrypt.hashSync(password, 10);

        user[username] = { password: hashedPassword };        

res.send('Registration succesful. You can now <a href="/">login</a>.');

    } else {

        res.send('Incorrect PIN. Please try again.');
        
    }
});

//User Dashboard
app.get('/dashboard', (req, res) => {
    
    if

(req.session.authenticated) {

        res.send(`
            <h2>User Dashboard</h2>

            <p>Welcome, ${req.session.username}!</p>

        `);

    } else {

        res.redirect('/');
    }   
});

// HTTPS Module
const httpsOptions = {

    key:
fs.readFileSync('server.key'),

    cert:
fs.readFileSync('server.cert')

};

// Create our HTTP for redirect and HTTPS server for secure connnection
http.createServer(app).listen(httpPort, () =>
{
    console.log(`HTTP Server running on port ${httpPort}`);
});

https.createServer(httpsOptions, app).listen(httpsPort, () =>
{
    console.log(`HTTPS Server running at ${httpsPort}`);
    
});