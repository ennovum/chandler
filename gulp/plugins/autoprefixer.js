const gulp = require('gulp');
const _ = require('lodash');
const autoprefixer = require('gulp-autoprefixer');

const conf = _.get(require('./../../buildconfig.js'), 'autoprefixer', {});

function autoprefixerPlugin(opts) {
    opts = _.merge({}, conf, opts);

    return autoprefixer(opts);
};

module.exports = autoprefixerPlugin;
