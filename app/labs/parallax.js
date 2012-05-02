/**
 * Module dependencies.
 */

// none

// Parallax

module.exports.start = function (expressServer) {
    console.log('Parallax is running.');

    // Extend routes
    expressServer.get('/labs/parallax', function (req, res) {
        res.render('labs/parallax', {
            pageTitle: 'Lab : Parallax'
        });
    });
};