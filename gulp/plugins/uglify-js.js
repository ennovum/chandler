const gulp = require('gulp');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const _ = require('lodash');

const buildconf = _.get(require('./../../build.js'), 'uglifyJs', {});

function uglifyJsPlugin(opts) {
    opts = _.merge({
        logTag: gutil.colors.gray('[uglify-js]')
    }, buildconf, opts);

    const stream = uglify(opts);
    stream.on('error', (err) => {
        uglifyJsErrorLog(err, stream, opts);
        stream.emit('end');
    });

    return stream;
};

function uglifyJsErrorLog(err, stream, opts) {
    gutil.beep();
    gutil.log(opts.logTag, gutil.colors.red(err.message + ' on line ' + err.lineNumber + ' in ' + err.fileName));
}

module.exports = uglifyJsPlugin;
