(function () {

    var _connection;

    var _wrapper;
    var _zindex = 1;

    var init = function () {
        _connection.on('message', function (data) {
            console.log(data);
        })
        .on('new-square', function (data) {
            addSquare(data.square, data.ownership);
        })
        .on('move', function (data) {
            move(data.id, { left: data.x, top: data.y });
        })
        .on('delete', function (data) {
            deleteSquare(data.id);
        });
    };

    var addSquare = function (square, ownership) {
        var sq = $('<div class="square" data-id="' + square.id + '" style="background: rgb(' + square.color.r + ',' + square.color.g + ',' + square.color.b + ');"></div>');
        sq.css({
            left: square.pos.x,
            top: square.pos.y,
            display: 'none'
        });
        if (ownership) {
            sq.addClass('mine').append('<p>Your square !</p>');

            sq.bind('drag', function (event) {
                var pos = {
                    top: event.offsetY - 79,
                    left: event.offsetX - 260
                };
                _connection.emit('move', { y: pos.top, x: pos.left });
                $(this).css(pos);
            });
        }
        else sq.css('z-index', _zindex++);

        _wrapper.append(sq);
        sq.fadeIn();
    };

    var move = function (squareId, pos) {
        $('[data-id=' + squareId + ']').css(pos);
    };

    var deleteSquare = function (squareId) {
        $('[data-id=' + squareId + ']').fadeOut(function () {
            $(this).detach();
        });
    };

    $(function () {
        _connection = io.connect('http://' + window.location.host + '/square');
        _wrapper = $('#squares');
        init();
    });

} ());