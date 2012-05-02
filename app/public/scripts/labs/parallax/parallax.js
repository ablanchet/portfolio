(function () {

    var _contents, _bg;

    var _itemsCount;
    var _currentItemId = 0;
    var _itemWidth = 660;
    var _parallaxRatio = 0.1;

    var goLeft = function () {
        if (_currentItemId + 1 < _itemsCount) {
            _currentItemId++;
            var positions = computePositions();
            move(positions.elements, positions.background);
        }
    };

    var goRigth = function () {
        if (_currentItemId > 0) {
            _currentItemId--;
            var positions = computePositions();
            move(positions.elements, positions.background);
        }
    };

    var move = function (elements, background) {
        _contents.css('left', elements + 'px');
        _bg.css('left', background + 'px');
    };

    var computePositions = function () {
        var elements = (0 - _currentItemId) * _itemWidth;
        var background = elements * _parallaxRatio;

        return { elements: elements, background: background };
    };

    $(function () {
        $('.goleft').click(goLeft);
        $('.gorigth').click(goRigth);

        _contents = $('.contents');
        _itemsCount = $('.content').length;
        _contents.css('width', (_itemWidth * _itemsCount) + 'px');
        _bg = $('.parallax-bg');
    });

} ());