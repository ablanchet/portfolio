var _pages = {
    'index': {
        view: 'index',
        data: { pageTitle: 'Accueil' }
    },
    'about': {
        view: 'about',
        data: { pageTitle: 'A propos' }
    },
    'skills': {
        view: 'skills',
        data: { pageTitle: 'Compétences' }
    },
    'accomplishments': {
        view: 'accomplishments',
        data: { pageTitle: 'Réalisations' }
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

exports.findPage = function (req, res, next) {
    var pageName = req.params.pageName || 'index';
    req.page = _pages[req.params.pageName] || _pages.index;
    next();
};