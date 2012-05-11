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
        data: { pageTitle: 'Mes compétences' },
        subpages: {
            'needs': {
                view: 'skills/needs',
                data: { pageTitle: 'Mes compétences' }
            },
            'help': {
                view: 'skills/help',
                data: { pageTitle: 'Mes compétences' }
            },
            'design': {
                view: 'skills/design',
                data: { pageTitle: 'Mes compétences' }
            },
            'drive': {
                view: 'skills/drive',
                data: { pageTitle: 'Mes compétences' }
            },
            'realize': {
                view: 'skills/realize',
                data: { pageTitle: 'Mes compétences' }
            },
            'train': {
                view: 'skills/train',
                data: { pageTitle: 'Mes compétences' }
            }
        }
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
                data: { pageTitle: 'CiviKey' }
            },
            'beapart': {
                view: 'experiences/beapart',
                data: { pageTitle: 'BeApart' }
            },
            'whirlpool': {
                view: 'experiences/whirlpool',
                data: { pageTitle: 'Whirlpool' }
            },
            'martini': {
                view: 'experiences/martini',
                data: { pageTitle: 'Martini' }
            },
            'esiea': {
                view: 'experiences/esiea',
                data: { pageTitle: 'Esiea (Candidature en ligne)' }
            },
            'talentsoft': {
                view: 'experiences/talentsoft',
                data: { pageTitle: 'TalentSoft' }
            },
            'windows-campus-program': {
                view: 'experiences/windowscampusprogram',
                data: { pageTitle: 'Windows Campus Program' }
            },
            'invenietis': {
                view: 'experiences/invenietis',
                data: { pageTitle: 'Invenietis' }
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