var gulp = require("gulp");
var _ = require("lodash");
var babel = require("gulp-babel");

var conf = _.get(require("./../../gulpconfig.js"), "babel", {});

function babelJob(src, dest, opts) {
    opts = _.extend(_.extend({}, conf), opts);

    return function () {
        return gulp.src(src)
            .pipe(babel(opts))
            .pipe(gulp.dest(dest));
    };
};

module.exports = babelJob;
