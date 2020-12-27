const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./db-config');
const bcrypt = require('bcryptjs');

function initialize(passport) {
    // authenticate user by checking if username and password match db
   passport.use(new LocalStrategy((username, password, done) => {
        console.log(username, password);
        pool.query(`SELECT * FROM users WHERE name = $1`, 
        [username], 
        (err, results) => {
            if (err) {
                throw err;
            }
            if (results.rows.length > 0) {
                const user = results.rows[0];
                bcrypt.compare(password, user.password, (err, match) => {
                    if (err) {
                        throw err;
                    }
                    if (match) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {message: 'incorrect password'});
                    }
                });
            }
            else {
                return done(null, false, {message: 'incorrect username'});
            }
        });
   }));

    // stores user id in session cookie
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    // uses id to get user details from the database
    passport.deserializeUser((id, done) => {
        pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
            if (err) {
                throw err;
            }
            return done(null, results.rows[0]);
        });
    });
}

module.exports = initialize;