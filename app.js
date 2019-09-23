const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 1337;

const index = require('./routes/index');
const report1 = require('./routes/report1');
const report2 = require('./routes/report2');
const report3 = require('./routes/report3');

app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use('/', index);
app.use('/reports/week/1', report1);
app.use('/reports/week/2', report2);
app.use('/reports/week/3', report3);

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    console.log("res", res);
    next();
});

// Add a route
app.get("/register", (req, res) => {
    const data = {
        data: {
            msg: "Register",
            // email: res.params.email,
            // birthday: res.params.birthday,
            // password: res.params.password
        }
    };

    res.json(data);
    console.log("res", res.statusCode);
    console.log("req", req);
});

app.get("/login", (req, res) => {
    const data = {
        data: {
            msg: "Register",
            // email: res.params.email,
            // birthday: res.params.birthday,
            // password: res.params.password
        }
    };

    res.json(data);
});

app.post("/login", (req, res) => {
    const data = {
        data: {
            msg: "Got a POST request, sending back 201 Created"
        }
    };

    res.json(data);
});

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

db.run("INSERT INTO users (email, password) VALUES (?, ?)",
    "user@example.com",
    "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
    if (err) {
        // returnera error
    }

    // returnera korrekt svar
});

const bcrypt = require('bcryptjs');
const saltRounds = 10;
const myPlaintextPassword = 'longandhardP4$$w0rD';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // spara lösenord i databasen.
});

const hash = 'superlonghashedpasswordfetchedfromthedatabase';

bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res innehåller nu true eller false beroende på om det är rätt lösenord.
});

const jwt = require('jsonwebtoken');

const payload = { email: "user@example.com" };
const secret = process.env.JWT_SECRET;

const token = jwt.sign(payload, secret, { expiresIn: '1h'});

jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
        // not a valid token
    }

    // valid token
});


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
