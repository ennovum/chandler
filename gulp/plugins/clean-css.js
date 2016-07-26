const gulp = require('gulp');
const gutil = require('gulp-util');
const through = require('through2');
const clean = require('gulp-clean-css');
const _ = require('lodash');

const buildconf = _.get(require('./../../build.js'), 'cleanCss', {});

function cleanCssPlugin(opts) {
    opts = _.merge({
        logTag: gutil.colors.gray('[clean-css]')
    }, buildconf, opts);

    const stream = clean(opts);
    stream.on('error', (err) => {
        cleanCssErrorLog(err, stream, opts);
        stream.emit('end');
    });

    return stream;
};

function cleanCssErrorLog(err, stream, opts) {
    gutil.beep();
    gutil.log(opts.logTag, gutil.colors.red(err.message + ' on line ' + err.lineNumber + ' in ' + err.fileName));
}

module.exports = cleanCssPlugin;
