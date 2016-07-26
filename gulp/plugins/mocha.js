const gulp = require('gulp');
const _ = require('lodash');
const mocha = require('gulp-mocha');

const buildconf = _.get(require('./../../build.js'), 'mocha', {});

function mochaPlugin(opts) {
    opts = _.merge({}, buildconf, opts);

    return mocha(opts);
};

module.exports = mochaPlugin;
