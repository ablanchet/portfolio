﻿/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
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

app.get('/', function(req, res){
  res.render('index', {
    pageTitle: 'Accueil'
  });
});
app.get('/about', function(req, res){
  res.render('about', {
    pageTitle: 'A propos'
  });
});
app.get('/skills', function(req, res){
  res.render('skills', {
    pageTitle: 'Compétences'
  });
});
app.get('/accomplishments', function(req, res){
  res.render('accomplishments', {
    pageTitle: 'Réalisations'
  });
});
app.get('/experiences', function (req, res) {
    res.render('experiences', {
        pageTitle: 'Expériences'
    });
});
app.get('/labs', function (req, res) {
    res.render('labs', {
        pageTitle: 'Labs'
    });
});
app.get('/labs/:labname', function (req, res) {
    res.render('labs/' + req.params.labname, {
        pageTitle: 'Lab : ' + req.params.labname
    });
});
app.use(function (req, res) {
    res.render('notfound', {
        pageTitle: 'Oups'
    });
});
// Only listen on $ node app.js

if (!module.parent) {
  app.listen(9451);
  console.log("Express server listening on port %d", app.address().port);
}