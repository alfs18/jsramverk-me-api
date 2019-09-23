var express = require('express');
var router = express.Router();

router.get('/reports/week/2', function(req, res, next) {
    const data = {
        data: {
            text: "Inspirationen till min date-picker fick jag från att titta på några olika alternativ på internet, bland annat från den här sidan:",
            text2: "https://www.smashingmagazine.com/2017/07/designing-perfect-date-time-picker/",
            text3: "Blev inte helt nöjd med den dock, då jag egentligen velat kunna klicka fram månaderna, så att de inte syntes från början, samt att år, månad och dag skulle vara i samma ruta, så att när man valt år, skulle den sen automatiskt gå vidare till månad och sen till dagar, men det hade jag tyvärr inte någon kunskap till."
        }
    };

    res.json(data);
});

module.exports = router;
