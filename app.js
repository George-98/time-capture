const express = require('express'),
    app = express(),
    path = require('path'),
    indexRouter = require('./routes/index'),
    hbs = require('hbs'),
    bodyParser = require('body-parser');

const partialsPath = path.join(__dirname, 'views/partials');

hbs.registerPartials(partialsPath);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server running on port 3000!');
});

module.exports = app;