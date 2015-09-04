var gulp = require("gulp");
var gutil = require("gulp-util");
var _ = require("lodash");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');

var conf = _.get(require("./../../gulpconfig.js"), 'sass', {});

function sassJob(src, dest, opts) {
    opts = _.extend(_.extend({
        logTag: gutil.colors.gray("[sass]"),
        onError: sassErrorLog
    }, conf), opts);

    function sassErrorLog(err) {
        gutil.beep();
        gutil.log(opts.logTag, gutil.colors.red(err.message + " on line " + err.line + " in " + err.file));
    }

    return function sassTask() {
        return gulp.src(src)
            .pipe(sass(opts))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest(dest));
    };
};

module.exports = sassJob;
