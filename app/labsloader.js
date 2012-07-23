/**
* Module dependencies.
*/

var fs = require('fs');

// ----------------------- private functions -----------------------
var _expressapp;

var moduleIsLab = function (lab) {
    return (lab.start && typeof (lab.start) == 'function') &&
            (lab.name && typeof (lab.name) == 'string' && lab.name.length > 0);
};

var findLabsModules = function (callback) {
    // find all js fils in '/labs'
    fs.readdir('./labs', function (err, files) {
        if (err == null) {
            var labs = [];
            for (var i in files) {
                var file = files[i];
                if (file.substring(file.length - 3) == '.js') {
                    // try to load and check if a "start" method is available
                    try {
                        var lab = require('./labs/' + file);
                        if (moduleIsLab(lab)) {
                            labs.push(lab);
                        } else {
                            console.log(file + ' has been rejected, it seems it\'s not a valid lab');
                        }
                    } catch (e) {
                        console.log('unable to load ' + file + '. Error : ' + e);
                    }
                }
            }
            // return the correct modules
            callback(labs);
        }
        else {
            console.log('unable to read /labs folder. Error : ' + err);
        }
    });
};

var loadLabsModules = function (labs) {
    // for each labs in lab call "start" with app
    for (var i in labs) {
        var lab = labs[i];
        try {
            if (lab.canBeStarted()) {
                lab.start(_expressapp);
                console.log(lab.name + ' has been started');
            }
        }
        catch (e) {
            console.log('Unable to start ' + lab.name + ' lab. Error : ' + e);
        }
    }
};

// ----------------------- Exports -----------------------
exports.loadandstart = function (expressapp) {
    _expressapp = expressapp;
    findLabsModules(loadLabsModules);
};