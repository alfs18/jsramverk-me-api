var express = require('express');
var router = express.Router();
const jwtSecret = require('dotenv').config().parsed.JWT_SECRET

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');


router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Vem är jag? Ingen vet."
        }
    };

    res.json(data);
});

async function getReports(req, res, next)  {
    reports = {};
    let sql = `SELECT id, title FROM reports`;
    await db.all(sql, (err, rows) => {
        rows.forEach(function (row) {

            reports[row.id] = row
        });

        next();
    });
}

router.get('/reports/weeks', (req, res, next) => getReports(req, res, next), (req, res) => {

    data = {
        hello: "hello",
        data: reports
    };

    console.log("row", data.data)

    console.log("reports/weeks", data);

    res.json(data);
});

async function getReport(req, res, next)  {
    report = {};
    let sql = `SELECT * FROM reports WHERE id = ?`;
    await db.get(sql, req.params.kmom, (err, rows) => {
        report["id"] = rows.id
        report["title"] = rows.title
        report["report"] = rows.report

        next();
    });
}

router.get('/reports/edit/:kmom', (req, res, next) => getReport(req, res, next), (req, res) => {

    data = {
        name: "Kursmoment " + req.params.kmom,
        msg: kmoms[req.params.kmom-1],
        data: {
            id: report.id,
            title: report.title,
            report: report.report,
        }
    };

    res.json(data);
});

router.get('/reports/week/:kmom', (req, res, next) => getReport(req, res, next), (req, res) => {

    data = {
        name: "Kursmoment " + req.params.kmom,
        data: {
            id: report.id,
            title: report.title,
            report: report.report,
        }
    };

    res.json(data);
});

function checkToken(req, res, next)  {
    const jwt = require('jsonwebtoken');

    const token = req.headers['x-access-token'];
    console.log("checking token", token);

    jwt.verify(token, jwtSecret, function(err, decoded) {
        console.log("hello, verifying");
        if (err) {
            // send error response
            console.log("error", err);
        }

        // Valid token send on the request
        console.log("valid");
        next();
    });
}

router.get('/logged-in',
    (req, res, next) => checkToken(req, res, next),
    function(req, res, next) {

    console.log("logged in");
    const data = {
        data: {
            dirTo: "/Logged-in",
            text: "Du har blivit inloggad"
        }
    };

    res.json(data);
});

module.exports = router;
