﻿/**
 * Module dependencies.
 */

// Parallax
module.exports.name = 'Parallax';
module.exports.canBeStarted = function () {
    return true;
};
module.exports.start = function (expressServer) {
    // Extend routes
    expressServer.get('/labs/parallax', function (req, res) {
        res.render('labs/parallax', {
            pageTitle: 'Lab : Parallax'
        });
    });
};