const gulp = require('gulp');
const _ = require('lodash');
const mocha = require('gulp-mocha');

const conf = _.get(require('./../../gulpconfig.js'), 'mocha', {});

function mochaPlugin(opts) {
    opts = _.extend({}, conf, opts);

    return mocha(opts);
};

module.exports = mochaPlugin;
