(function () {

    var _contents, _bg, _itemWidth;
    var _currentItemPlaceHolder;

    var _itemsCount;
    var _currentItemId = 0;
    var _parallaxRatio = 13 / 100;

    var _sizeOfLeftElementForNavigation = 50;

    var goRigth = function () {
        if (_currentItemId + 1 < _itemsCount) {
            _currentItemId++;
            move();
        }
    };
    var goLeft = function () {
        if (_currentItemId > 0) {
            _currentItemId--;
            move();
        }
    };
    var goTo = function () {
        var id = $(this).data('id');
        if (_currentItemId != id) {
            _currentItemId = id;
            move();
        }
    };

    var move = function () {
        var positions = computePositions();
        _contents.css('left', positions.elements + 'px');
        _bg.css('left', positions.background + 'px');
        
        refreshCurrentItemPlaceHolder();
    };
    var computePositions = function () {
        var elements = (0 - _currentItemId) * _itemWidth;
        if (_currentItemId != 0) elements += _sizeOfLeftElementForNavigation;
        var background = elements * _parallaxRatio;

        return { elements: elements, background: background };
    };

    var refreshCurrentItemPlaceHolder = function () {
        _currentItemPlaceHolder.html(_currentItemId + 1 + '/' + _itemsCount);
    };

    $(function () {
        $('.goleft').click(goLeft);
        $('.gorigth').click(goRigth);

        $('.content').click(goTo);

        _currentItemPlaceHolder = $('.currentItem');
        _bg = $('.parallax-bg');
        _contents = $('.contents');
        var content = $('.content', _contents);
        _itemWidth = content.outerWidth(true);
        _itemsCount = content.length;
        _contents.css('width', (_itemWidth * _itemsCount) + 'px');

        refreshCurrentItemPlaceHolder();
    });

} ());