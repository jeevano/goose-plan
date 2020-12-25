// imports
const express = require('express');
const cors = require('cors');

const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const cookieparser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const expresssession = require('express-session');
const bodyparser = require('body-parser');

const { pool } = require('./config/db-config');

require('dotenv').config();

// variables
const app = express();
const port = process.env.PORT || 5000;
const secretcode = process.env.SECRET_CODE;

// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(expresssession({
    secret: secretcode,
    resave: true,
    saveUninitialized: true,
}));
app.use(cookieparser(secretcode));

// routes
app.get('/', (req, res) => {
    res.end('hello world!');
});
app.post('/login', (req, res) => {
    //req.end('hello world');
    console.log(req.body);

    let { name, password } = req.body;


});
app.post('/signup', (req, res) => {
    //req.end('hello world');
    console.log(req.body);

    let { name, password, confirmpassword } = req.body;

    // form validation clientside * make sure name not same as existing

});

// start server
app.listen(port, () => {
    console.log('server started on port: ' + port);
});