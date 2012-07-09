/**
 * Module dependencies.
 */

var express = require('express');
var pages = require('./pages.js');
var labs = require('./labsloader.js');

var app = express.createServer();

// Configuration
app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});
app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/*?', pages.findPageFromRequest, function (req, res, next) {
    if (req.page != null) {
        res.render(req.page.view, req.page.data);
    }
    else next();
});

// Start web application
app.listen(process.env.port || 1337);

// Load and start labs
labs.loadandstart(app);