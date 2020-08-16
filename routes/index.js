const express = require('express'),
    router = express.Router(),
    home = require('./home');

router.get('', (req, res) => {
    return home.load(req, res);
});

router.get('/help', (req, res)=> {
    res.send('Help!!!');
});

module.exports = router;