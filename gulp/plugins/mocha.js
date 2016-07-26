const gulp = require('gulp');
const _ = require('lodash');
const mocha = require('gulp-mocha');

const buildconf = _.get(require('./../../buildconf.js'), 'mocha', {});

function mochaPlugin(opts) {
    opts = _.merge({}, buildconf, opts);

    return mocha(opts);
};

module.exports = mochaPlugin;
