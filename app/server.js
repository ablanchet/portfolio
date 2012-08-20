/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
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
        req.page.data.view = req.page.view + '.jade';
        res.render(req.page.view, req.page.data);
    }
    else next();
});

 //app.post('/saveedition', function (req, res) {
 //    var newContent = req.body.editedContent;
 //    var page = __dirname + '/views/' + req.body.page;
 //    var stream = fs.createWriteStream(page, { flags: 'w' });
 //    stream.on('open', function () {
 //        stream.write(newContent);
 //        stream.end();

 //        res.send({ success: true });
 //    });
 //});

// Start web application
app.listen(process.env.PORT || 1337);

// Load and start labs
labs.loadandstart(app);