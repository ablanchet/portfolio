/**
 * Module dependencies.
 */
var cluster = require('cluster');
var numCpus = require('os').cpus().length;

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

if (cluster.isMaster) {
    console.log('Application started, clustered with %d processors', numCpus);
    
    // Fork workers
    for (var i = 0; i < numCpus; i++) {
        cluster.fork();
    }
    cluster.on('death', function (w) {
        console.log('worker ' + w.pid + ' died');
        cluster.fork();
    });
} else {
    console.log('Worker %d started', process.env.NODE_WORKER_ID);
    
    // Start web application
    app.listen(9451);

    // Load and start labs
    labs.loadandstart(app);
}