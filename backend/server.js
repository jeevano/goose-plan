const express = require('express');
const cors = require('cors');

const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

//require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// route
app.get('/', (req, res) => {
    res.end('hello world');
});

app.listen(port, () => {
    console.log('server started on port: ' + port);
});