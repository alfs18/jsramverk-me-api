var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    const data = {
        data: {
            text: "Alice heter jag och kommer från en liten by i norra Skåne.",
            text2: "På fritiden sysslar jag en del med musik och tycker även om att fotografera."
        }
    };

    res.json(data);
});

router.get('/reports/week/1', function(req, res) {
    const data = {
        data: {
            text: "GitHub-repot: https://github.com/alfs18/jsramverk",
            text2: "Innehållet från README.md:",
            // msg: "# my-project
            //
            // ## Project setup
            // ```
            // npm install
            // ```
            //
            // ### Compiles and hot-reloads for development
            // ```
            // npm run serve
            // ```
            //
            // ### Compiles and minifies for production
            // ```
            // npm run build
            // ```
            //
            // ### Run your tests
            // ```
            // npm run test
            // ```
            //
            // ### Lints and fixes files
            // ```
            // npm run lint
            // ```
            //
            // ### Customize configuration
            // See [Configuration Reference](https://cli.vuejs.org/config/)."
        }
    };

    res.json(data);
});

router.get('/reports/week/2', function(req, res) {
    const data = {
        data: {
            text: "Inspirationen till min date-picker fick jag från att titta på några olika alternativ på internet, bland annat från den här sidan:",
            text2: "https://www.smashingmagazine.com/2017/07/designing-perfect-date-time-picker/",
            text3: "Blev inte helt nöjd med den dock, då jag egentligen velat kunna klicka fram månaderna, så att de inte syntes från början, samt att år, månad och dag skulle vara i samma ruta, så att när man valt år, skulle den sen automatiskt gå vidare till månad och sen till dagar, men det hade jag tyvärr inte någon kunskap till."
        }
    };

    res.json(data);
});

router.get('/reports/week/3', function(req, res) {
    const data = {
        data: {
            msg: "nothing"
        }
    };

    res.json(data);
});

router.post("/reports",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.addReport(res, req.body));

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            // send error response
        }

        // Valid token send on the request
        next();
    });
}


module.exports = router;
