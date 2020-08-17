const express = require('express'),
    router = express.Router(),
    home = require('./home');

router.get('', (req, res) => {
    return home.load(req, res);
});

router.post('/start-timer', (req, res)=> {
    const message = home.load(req, res);
    return res.send(message);
});

module.exports = router;