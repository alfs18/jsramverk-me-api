var express = require('express');
var router3 = express.Router();

router3.get('/reports/week/3', function(req, res, next) {
    const data = {
        data: {
            msg: "tre"
        }
    };

    res.json(data);
});

module.exports = router3;
