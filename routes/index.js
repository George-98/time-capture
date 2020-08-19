const express = require('express'),
    router = express.Router(),
    home = require('./home');

router.get('', (req, res) => {
    return home.load(req, res, hbsParams => {
        return res.render('index', hbsParams);
    });
});

router.post('/start-timer', (req, res)=> {
    return home.load(req, res, message => {
        return res.send(message);
    });
});

module.exports = router;