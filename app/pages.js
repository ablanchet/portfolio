var _pages = {
    'index': {
        view: 'index',
        data: { pageTitle: 'Accueil' }
    },
    'about': {
        view: 'about',
        data: { pageTitle: 'A propos' },
        subpages: {
            'career': {
                view: 'career',
                data: { pageTitle: 'Mon parcours' }
            }
        }
    },
    'skills': {
        view: 'skills',
        data: { pageTitle: 'Compétences' }
    },
    'references': {
        view: 'references',
        data: { pageTitle: 'Références' }
    },
    'experiences': {
        view: 'experiences',
        data: { pageTitle: 'Expériences' }
    },
    'labs': {
        view: 'labs',
        data: { pageTitle: 'Labs' }
    }
};

var _notFound = function (req, res) {
    res.render('notfound', {
        pageTitle: 'Oups'
    });
};

var _findPage = function (pageName, pages) {
    if (typeof (pageName) !== 'string') {
        var page = pageName.pop();
        if (pageName.length > 0) {
            var o = pages[page];
            if (o != null && o.subpages) return _findPage(pageName, o.subpages);
            else return null;
        }
    }
    return pages[page];
};

exports.findPage = function (pageName) {
    return _findPage(pageName.split('/').reverse(), _pages);
};
exports.findPageFromRequest = function (req, res, next) {
    var pageName = req.params[0] || 'index';
    req.page = exports.findPage(pageName);
    next();
};