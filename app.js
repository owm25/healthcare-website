// app.js
const express =
require('express');
const bodyParser =
require('body-parser');
const session =
require('express-session');
const bcrypt =
require('bcrypt');

const app = express()
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded
({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true        
}));

// Pretend PIN provided to patient
const doctorPIN = '1234';

// In-memory storage for registered users
const user = {};

// Homepage with Login Portal
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to Our
Private Dental Office</h1>
        <p>Our mission is to 
        provide high quality dental
        care with a personal touch.</p>
        <h2>Login</h2>
        <form action="/login"
method="post">        
            <label
for="username">Username:</label>
            <input
type="text" id="username"
name="username" required>
            <label            
for="password">Password:</label>
            <input
type="password" id="password"
name="password" required>
            <button
type="submit">Login</button>
        </form>
        <p>Don't have an
account? <a href="/
register">Register Here</a></p>
    `);            
});

//Login Handler
app.post('/login', (req, res) => {
    const { username,
password } = req.body;
    if (users[username] &&
bcrypt.compareSync(password,
users[username].password)) {

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
            <label
for="username">Username:</label>
            <input
type="text" id="username"
name="username" required>
            <label            
for="password">Password:</label>
            <input
type="password" id="password"
name="password" required>
            <label
for="pin">Enter PIN provided
by your Dentist:</label>
            <input
type="text" id="pin"
name="pin" required>
            <button
type="submit">Register</button>
        </form>
    `);
});

// Registration Handler
app.post('/register', (req,
res => {
    const { username,
password, pin } = req.body;        
    if (pin === doctorPIN) {
        const hashedPassword
= bcrypt.hashSync(password,
10);        
        users[username] =
{ password: hashedPassword };        

res.send('Registration succesful. You can now <a href="/">login</a>.');
    } else {
        res.send('Incorrect PIN. Please try again.');
    }
}));

//User Dashboard
app.get('/dashboard', (req,
res) => {
    if
(req.session.authenticated) {
        res.send(`
            <h2>User
Dashboard</h2>
            <p>Welcome, $
{req.session.username}!</p>
        `);
    } else {
        res.redirect('/');
    }   
});

app.listen(port, () => {
    console.log(`Server
running at http://127.0.0.1:$
{port}`);
});
// Need to generate a self-signed SSL certificate.
// After SSL is generated. Configure Express to use the HTTPS module with my SSL certificate.
// Add all necessary dependencies for HTTPS