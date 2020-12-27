// imports / dependencies
const express = require('express');
const cors = require('cors');

const passport = require('passport');
//const passportlocal = require('passport-local').Strategy;
const initializePassport = require('./config/passport-config');
initializePassport(passport);

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
app.use(passport.initialize());
app.use(passport.session());

// routes
app.get('/', (req, res) => {
    //res.end('hello world!');
    res.send(req.user);
});
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log(req.user);
        if (err) throw err;
        if (!user) console.log('user does not exist');
        if (user) {
            req.logIn(user, (err) => {
                if (err) throw err;
                console.log(req.user);
                res.send(req.user);
            });
        }
    })(req, res, next);
});
app.post('/signup', async (req, res) => {
    //req.end('hello world');
    console.log(req.body);

    let { username, password } = req.body;

    let hashedpassword = await bcrypt.hash(password, 10);

    // make sure name not same as existing
    pool.query(`SELECT * FROM users WHERE name = $1`, 
    [username], 
    (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
            console.log(results.rows);
            res.send('that username is already in use');
        } else {
            pool.query(`INSERT INTO users (name, password) 
            VALUES ($1, $2) 
            RETURNING id, password`, 
            [username, hashedpassword], 
            (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results.rows);
                //res.redirect('/login'); // causing problems
            });

            res.send('account registered');
        }
    });

});

// start server
app.listen(port, () => {
    console.log('server started on port: ' + port);
});