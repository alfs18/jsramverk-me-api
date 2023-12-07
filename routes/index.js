var express = require('express');
var router = express.Router();
const jwtSecret = require('dotenv').config().parsed.JWT_SECRET


// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/texts.sqlite');
const db = require('../db/database.js');

// MongoDB
const mongo = require("mongodb").MongoClient;
// const dsn =  process.env.DBWEBB_DSN || "mongodb://127.0.0.1/mumin";
const dsn =  process.env.DBWEBB_DSN || "mongodb://127.0.0.1/chat";

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
    const data = {
        hello: "hello",
        data: reports
    };

    // console.log("row", data.data)
    // console.log("reports/weeks", data);

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
    const data = {
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

// router.get("/listing", (req, res) => {
//     console.log("listing");
//     const data = {
//         name: "Smask",
//         data: "Hej"
//     };
//
//     res.json(data);
// });

router.get('/reports/week/:kmom', (req, res, next) => getReport(req, res, next), (req, res) => {
    const data = {
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

// Save chat messages to MongoDB
router.post("/chat/save", async (req, res) => {
    let doc = req.body.msg;

    await saveInCollection(dsn, "messages", {doc});

    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created"
        }
    });
});

/**
 * Save documents in a collection.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} docs       Documents to be saved.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */
async function saveInCollection(dsn, colName, doc) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);

    const result = await col.insertOne(doc);
    console.log(
       `A document was inserted with the _id: ${result.insertedId}`,
    );

    await client.close();
}

// Return a JSON object with list of all documents within the collection.
router.get("/list", async (req, res) => {
    try {
        let ans = await findInCollection(dsn, "messages", {}, {}, 0);

        console.log(ans);
        res.json(ans);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

/**
 * Find documents in a collection by matching search criteria.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} criteria   Search criteria.
 * @param {object} projection What to project in results.
 * @param {number} limit      Limit the number of documents to retrieve.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */
async function findInCollection(dsn, colName, criteria, projection, limit) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.find(criteria, projection).limit(limit).toArray();

    await client.close();

    return res;
}

module.exports = router;
