/**
 * Module dependencies.
 */

// Infinite Scroll
module.exports.name = 'Infinite scroll';
module.exports.start = function (expressServer) {
    // Extend routes
    expressServer.get('/labs/inifinitescroll', function (req, res) {
        res.render('labs/inifinitescroll', {
            pageTitle: 'Lab : Infinite Scroll'
        });
    });
};