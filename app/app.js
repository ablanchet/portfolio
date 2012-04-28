/**
 * Module dependencies.
 */

var express = require('express');
var pages = require('./pages.js');
var squarenode = require('./squarenode.js');

var app = module.exports = express.createServer();

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

app.get('/:pageName?', pages.findPage, function (req, res) {
    res.render(req.page.view, req.page.data);
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(9451);
  console.log("Express server listening on port %d", app.address().port);
}

// Start labs
squarenode.start(app);