(function () {
    var _pagewidth = 3960;
    var _durationratio = 3;
    var _container;

    var _getPages = function () {
        return _container.children('.page');
    };

    var _bindEvents = function (elements) {
        elements.hover(function () {
            _getPages().stop();
        },
        function () {
            _animatePages();
        })
        .children('.item').hover(function () {
            $(this).animate({ width: 600 }, 500);
        },
        function () {
            $(this).clearQueue();
            $(this).animate({ width: 300 }, 500);
        });
    };

    var _animatePages = function () {
        var pages = _getPages();

        var p1 = $(pages[0]);
        var p2 = $(pages[1]);
        var p3 = $(pages[2]);

        var current = p1.position().left;
        var distance = _pagewidth - Math.abs(current);
        p1.animate({ left: -_pagewidth }, distance * _durationratio, 'linear', function () {
            var el = $(this).clone();
            $(this).detach();
            el.css('left', '7920px');
            _container.append(el);
            _animatePages();
            _bindEvents(el);
        });
        p2.animate({ left: 0 }, distance * _durationratio, 'linear');
        p3.animate({ left: _pagewidth }, distance * _durationratio, 'linear');
    };

    var basicAnimation = function () {
        _container = $('.container');
        _animatePages();
        _bindEvents(_getPages());
    };

    $(function () {
        basicAnimation();
    });

} ());