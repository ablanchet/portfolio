/**
 * Module dependencies.
 */

var io = require('socket.io');

// SquareNode

var _socket;
var _clients = [];

var init = function (socket) {
    _socket = socket.of('/square');

    _socket.on('connection', function (client) {
        _clients.push(client);
        client.emit('message', 'Welcome !');
    });
};

module.exports.start = function (expressServer) {
    console.log('SquareNode is running.');

    // Extend routes
    expressServer.get('/labs/squarenode', function (req, res) {
        res.render('labs/squarenode', {
            pageTitle: 'Lab : SquareNode'
        });
    });

    // Listen on express server and init module
    init(io.listen(expressServer));
};