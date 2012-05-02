(function () {

    var _contents, _bg;

    var _itemsCount;
    var _currentItemId = 0;
    var _itemWidth = 630;
    var _parallaxRatio = 0.1;

    var goLeft = function () {
        if (_currentItemId + 1 < _itemsCount) {
            _currentItemId++;
            move();
        }
    };

    var goRigth = function () {
        if (_currentItemId > 0) {
            _currentItemId--;
            move();
        }
    };

    var goTo = function () {
        _currentItemId = $(this).data('id');
        move();
    };

    var move = function () {
        var positions = computePositions();
        _contents.css('left', positions.elements + 'px');
        _bg.css('left', positions.background + 'px');
    };

    var computePositions = function () {
        var elements = (0 - _currentItemId) * _itemWidth;
        var background = elements * _parallaxRatio;

        return { elements: elements, background: background };
    };

    $(function () {
        $('.goleft').click(goLeft);
        $('.gorigth').click(goRigth);
        $('.content').click(goTo);

        _contents = $('.contents');
        _itemsCount = $('.content').length;
        _contents.css('width', (_itemWidth * _itemsCount) + 'px');
        _bg = $('.parallax-bg');
    });

} ());