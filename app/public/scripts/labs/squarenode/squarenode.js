(function () {

    var _connection;

    var init = function () {
        _connection.on('message', function (data) {
            console.log(data);
        });

        _connection.on('move', function (square) {
            move(square);
        });
    };

    var move = function (square) {
    };

    $(function () {
        _connection = io.connect('http://' + window.location.host + '/square');
        init();
    });

} ());