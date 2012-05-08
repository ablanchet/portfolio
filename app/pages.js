var _pages = {
    'index': {
        view: 'index',
        data: { pageTitle: 'Accueil' }
    },
    'about': {
        view: 'about/about',
        data: { pageTitle: 'A propos' },
        subpages: {
            'career': {
                view: 'about/career',
                data: { pageTitle: 'Mon parcours' }
            }
        }
    },
    'skills': {
        view: 'skills/skills',
        data: { pageTitle: 'Compétences' },
        subpages: {
            'needs': {
                view: 'skills/needs',
                data: { pageTitle: 'Compétences' }
            },
            'help': {
                view: 'skills/help',
                data: { pageTitle: 'Compétences' }
            },
            'design': {
                view: 'skills/design',
                data: { pageTitle: 'Compétences' }
            },
            'drive': {
                view: 'skills/drive',
                data: { pageTitle: 'Compétences' }
            },
            'realize': {
                view: 'skills/realize',
                data: { pageTitle: 'Compétences' }
            },
            'train': {
                view: 'skills/train',
                data: { pageTitle: 'Compétences' }
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