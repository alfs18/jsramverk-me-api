var express = require('express');
var router = express.Router();

router.post('/register', function(req, res, next) {
    const data = {
        data: {
            msg: "Hello"
        }
    };

    res.json(data);
});

module.exports = router;
