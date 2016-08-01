const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const sass = require('gulp-sass');

const buildconf = _.get(require('./../../build.js'), 'sass', {});

function sassPlugin(opts) {
    opts = _.merge({
        logTag: gutil.colors.gray('[sass]')
    }, buildconf, opts);

    const stream = sass(opts);
    stream.on('error', (err) => {
        sassErrorLog(err, stream, opts);
        stream.emit('end');
    });

    return stream;
};

function sassErrorLog(err, stream, opts) {
    gutil.beep();
    gutil.log(opts.logTag, gutil.colors.red(err.message + ' on line ' + err.line + ' in ' + err.file));
}

module.exports = sassPlugin;
