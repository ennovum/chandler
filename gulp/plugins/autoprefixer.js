const gulp = require('gulp');
const _ = require('lodash');
const autoprefixer = require('gulp-autoprefixer');

const buildconf = _.get(require('./../../buildconf.js'), 'autoprefixer', {});

function autoprefixerPlugin(opts) {
    opts = _.merge({}, buildconf, opts);

    return autoprefixer(opts);
};

module.exports = autoprefixerPlugin;
