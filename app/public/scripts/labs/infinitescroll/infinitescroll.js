(function () {
    var _pagewidth = 3960;
    var _animationduration = 20000;
    var _container;

    var _animatePage = function (first, second, third) {
        var a = first.animate({ left: -_pagewidth }, _animationduration, 'linear', function () {
            var el = $(this).clone();
            $(this).detach();
            el.css('left', '7920px');
            _container.append(el);
            _animatePage(second, third, el);
        });
        second.animate({ left: 0 }, _animationduration, 'linear');
        third.animate({ left: _pagewidth }, _animationduration, 'linear');

        console.log(a);
    };

    var basicAnimation = function () {
        _container = $('.container');
        _animatePage($('.p1'), $('.p2'), $('.p3'));
    };

    $(function () {
        basicAnimation();
    });

} ());