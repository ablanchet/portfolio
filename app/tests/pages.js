var pagesModule = require('./../pages');
var assert = require('assert');

// Check ok sub navigation
(function () {
    var page = pagesModule.findPage('about/career');
    assert.ok(page != null);
    assert.ok(page.view == 'career');
} ());

// Check buggy sub navigation
(function () {
    var page = pagesModule.findPage('labs/something');
    assert.ok(page == null);
} ());