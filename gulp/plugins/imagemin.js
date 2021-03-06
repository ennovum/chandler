const gulp = require('gulp');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const _ = require('lodash');

const buildconf = _.get(require('./../../build.js'), 'imagemin', {});

function imageminPlugin(opts) {
    opts = _.merge({
        logTag: gutil.colors.gray('[imagemin]')
    }, buildconf, opts);

    const stream = imagemin(opts);
    stream.on('error', (err) => {
        imageminErrorLog(err, stream, opts);
        stream.emit('end');
    });

    return stream;
};

function imageminErrorLog(err, stream, opts) {
    gutil.beep();
    gutil.log(opts.logTag, gutil.colors.red(err.message + ' on line ' + err.lineNumber + ' in ' + err.fileName));
}

module.exports = imageminPlugin;
