var _pages = {
    'index': {
        view: 'index',
        data: { pageTitle: 'Accueil' }
    },
    'about': {
        view: 'about/about',
        data: { pageTitle: 'À propos' },
        subpages: {
            'career': {
                view: 'about/career',
                data: { pageTitle: 'Mon parcours' }
            }
        }
    },
    'skills': {
        view: 'skills/skills',
        data: { pageTitle: 'Mes compétences' }
    },
    'references': {
        view: 'references',
        data: { pageTitle: 'Références' }
    },
    'experiences': {
        view: 'experiences/experiences',
        data: { pageTitle: 'Expériences' },
        subpages: {
            'civikey': {
                view: 'experiences/civikey',
                data: { pageTitle: 'Expérience' }
            },
            'beapart': {
                view: 'experiences/beapart',
                data: { pageTitle: 'Expérience' }
            },
            'whirlpool': {
                view: 'experiences/whirlpool',
                data: { pageTitle: 'Expérience' }
            },
            'martini': {
                view: 'experiences/martini',
                data: { pageTitle: 'Expérience' }
            },
            'esiea': {
                view: 'experiences/esiea',
                data: { pageTitle: 'Expérience' }
            },
            'talentsoft': {
                view: 'experiences/talentsoft',
                data: { pageTitle: 'Expérience' }
            },
            'windows-campus-program': {
                view: 'experiences/windowscampusprogram',
                data: { pageTitle: 'Expérience' }
            },
            'invenietis': {
                view: 'experiences/invenietis',
                data: { pageTitle: 'Expérience' }
            }
        }
    },
    'labs': {
        view: 'labs/labs',
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