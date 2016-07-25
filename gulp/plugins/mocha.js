const gulp = require('gulp');
const _ = require('lodash');
const mocha = require('gulp-mocha');

const conf = _.get(require('./../../buildconfig.js'), 'mocha', {});

function mochaPlugin(opts) {
    opts = _.merge({}, conf, opts);

    return mocha(opts);
};

module.exports = mochaPlugin;
