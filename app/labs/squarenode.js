/**
 * Module dependencies.
 */

var io = require('socket.io');

// SquareNode

var _socket;
var _clients = {};

var init = function (socket) {
    socket.configure('production', function () {
        socket.enable('browser client etag');
        socket.set('log level', 1);

        socket.set('transports', [
            'websocket'
          , 'flashsocket'
          , 'htmlfile'
          , 'xhr-polling'
          , 'jsonp-polling'
        ]);
    });

    _socket = socket.of('/square');
    _socket.on('connection', onNewClient);
};

var onNewClient = function (client) {
    // bind its deconnection
    client.on('disconnect', function () {
        delete _clients[client.id];
        _socket.emit('delete', { id: client.id });
    });

    client.on('move', function (data) {
        onMove(data, client);
    });

    // create its square and send it to him
    var sq = createSquare(client);
    client.emit('new-square', { square: sq, ownership: true });

    iterateClients(function (c) {
        // send the new square to other clients
        c.client.emit('new-square', { square: sq });
        // send all the other squares to the new client
        client.emit('new-square', { square: c.square });
    });

    // add the square to the clients
    _clients[client.id] = { square: sq, client: client };
};

var onMove = function (data, client) {
    // update square position
    _clients[client.id].square.pos = data;
    iterateClients(function (c) {
        c.client.emit('move', { id: client.id, x: data.x, y: data.y });
    }, client);
};

var createSquare = function(client){
    var color = { 
        r: Math.round( Math.random() * 100 % 255 ), 
        g: Math.round( Math.random() * 100 % 255 ),
        b: Math.round( Math.random() * 100 % 255 )
    };
    var pos = { x: 0, y: 0 };
    return { color: color, pos: pos, id: client.id };
};
var iterateClients = function (action, except) {
    for (var c in _clients) {
        var client = _clients[c];
        if (except == null || client.id != except.id) {
            action(client);
        }
    }
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