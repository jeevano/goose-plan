//
//  IMPORTS
//
const express = require('express');
const cors = require('cors');

const passport = require('passport');
const initializePassport = require('./config/passport-config');
initializePassport(passport);

const cookieparser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const expresssession = require('express-session');
const bodyparser = require('body-parser');

const { pool } = require('./config/db-config');

require('dotenv').config();

//
const app = express();
const port = process.env.PORT || 5000;
const secretcode = process.env.SECRET_CODE || 'secret code';

//
//  MIDDLEWARE
//
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

//
//  ROUTES
//

//
//  ROUTES FOR LIST
app.post('/create', async (req, res) => {
    let { title , course , date , time } = req.body;
    let name = req.user.name;

    pool.query(`INSERT INTO todos (name, title, course, date, time) VALUES ($1, $2, $3, $4, $5)`,
    [name, title, course, date, time],
    (err, results) => {
        if (err) throw err;
        console.log(results.rows);
        res.send('success');
    });

});
app.get('/read', async (req, res) => {
    let name = req.user.name;

    pool.query(`SELECT * FROM todos WHERE name = $1`, 
    [name],
    (err, results) => {
        if (err) throw err;
        console.log(results.rows);
        res.send(results.rows);
    });

});
app.get('/read/:id', async (req, res) => {
    // = req.params?
    let { id } = req.params;

    pool.query(`SELECT * FROM todos WHERE todo_id = $1`, 
    [id],
    (err, results) => {
        if (err) throw err;
        console.log(results.rows);
        res.send(results.rows[0]);
    });

});
app.put('/read/:id', async (req, res) => {
    let { id } = req.params;
    let { title , course , date , time , isDone } = req.body;

    pool.query(`UPDATE todos SET title = $1, course = $2, date = $3, time = $4, is_done = $5 WHERE todo_id = $6`,
    [title, course, date, time, isDone, id],
    (err, results) => {
        if (err) throw err;
        console.log(results.rows);
        res.send('success');
    });

});
app.delete('/read/:id', async (req, res) => {
    let { id } = req.params;

    pool.query(`DELETE FROM todos WHERE todo_id = $1`, 
    [id],
    (err) => { 
        if (err) throw err; 
        res.send('success');
    });

});
//
//  ROUTES FOR USER AUTHENTICATION
app.get('/', (req, res) => {
    console.log('USER REQUEST:')
    console.log(req.user);
    res.send(req.user);
});
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log(req.user);
        if (err) throw err;
        if (!user) {
            console.log('user does not exist');
            res.send('err');
        }
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
    console.log(req.body);

    let { username , password } = req.body;

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
            });

            res.send('account registered');
        }
    });

});

//
//  START SERVER
//
app.listen(port, () => {
    console.log('SERVER STARTED ON PORT: ' + port);
});