var app = require('express')();
var server = require('http').Server(app);
var request = require("request");
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/series');

console.log('--Server started--');
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.configure(function() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(allowCrossDomain);
});
server.listen(1337);
var db = mongoose.connection;
var serieModel = require('./models/serieSchema');
var crawlerPrototype = require('./prototypes/crawlerPrototype.js');
var seriePrototype = require('./prototypes/seriePrototype.js');
require('./routes/routesSerie')(app, serieModel, crawlerPrototype, seriePrototype);



// mongoose.disconnect();



