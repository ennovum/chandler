const gulp = require('gulp');
const gutil = require('gulp-util');
const through = require('through2');
const _ = require('lodash');
const sass = require('gulp-sass');

const conf = _.get(require('./../../buildconfig.js'), 'sass', {});

function sassPlugin(opts) {
    opts = _.merge({
        logTag: gutil.colors.gray('[sass]')
    }, conf, opts);

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
