const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const conf = _.get(require('./../../gulpconfig.js'), 'sass', {});

function sassJob(src, dest, opts) {
    opts = _.extend({
        logTag: gutil.colors.gray('[sass]')
    }, conf, opts);

    function sassErrorLog(err) {
        gutil.beep();
        gutil.log(opts.logTag, gutil.colors.red(err.message + ' on line ' + err.line + ' in ' + err.file));
    }

    return () => gulp.src(src)
        .pipe(sass(opts).on('error', sassErrorLog))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(dest));
};

module.exports = sassJob;
