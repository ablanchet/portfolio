/**
 * Module dependencies.
 */

// Infinite Scroll
module.exports.name = 'Infinite scroll';
module.exports.start = function (expressServer) {
    // Extend routes
    expressServer.get('/labs/infinitescroll', function (req, res) {
        res.render('labs/infinitescroll', {
            pageTitle: 'Lab : Infinite Scroll'
        });
    });
};