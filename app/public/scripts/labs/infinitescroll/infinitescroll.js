(function () {
    var _directions = { left: -1, right: +1 };
    var _currentdirection = _directions.right;

    var _pagewidth = 3960;
    var _durationratio = 10;
    var _container;

    var _getPages = function () {
        return _container.children('.page');
    };

    var _changeDirection = function (direction) {
        if (direction != _currentdirection) {
            _currentdirection = direction;
            _getPages().stop();
            _animatePages();
        }
    };

    var _bindEvents = function (elements) {
        elements.hover(function () {
            _getPages().stop();
        },
        function () {
            _animatePages();
        });
    };

    var _animatePages = function () {
        var pages = _getPages();

        var p1 = $(pages[0]);
        var p2 = $(pages[1]);
        var p3 = $(pages[2]);
        var current = p2.position().left;

        if (_currentdirection == _directions.right) {
            var distance = _pagewidth - current;
            p1.animate({ left: 0 }, distance * _durationratio, 'linear');
            p2.animate({ left: _pagewidth }, distance * _durationratio, 'linear', function () {
                var el = p3.clone();
                p3.detach();
                el.css('left', '-3960px');
                _container.prepend(el);
                _animatePages();
                _bindEvents(el);
            });
            p3.animate({ left: _pagewidth * 2 }, distance * _durationratio, 'linear');
        }
        else { // the left direction is the default
            var distance = _pagewidth + current;
            p1.animate({ left: -(_pagewidth * 2) }, distance * _durationratio, 'linear');
            p2.animate({ left: -_pagewidth }, distance * _durationratio, 'linear', function () {
                var el = p1.clone();
                p1.detach();
                el.css('left', '3960px');
                _container.append(el);
                _animatePages();
                _bindEvents(el);
            });
            p3.animate({ left: 0 }, distance * _durationratio, 'linear');
        }
    };

    var basicAnimation = function () {
        _container = $('.container');
        _animatePages();
        _bindEvents(_getPages());
        $('.navleft').hover(function () { _changeDirection(_directions.right); });
        $('.navright').hover(function () { _changeDirection(_directions.left); });
    };

    $(function () {
        basicAnimation();
    });

} ());