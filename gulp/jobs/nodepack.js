var gulp = require("gulp");
var _ = require("lodash");
var named = require("vinyl-named");
var webpack = require("gulp-webpack");

var conf = _.get(require("./../../gulpconfig.js"), 'nodepack', {});

function nodepackJob(src, dest, opts) {
    opts = _.extend(_.extend({}, conf), opts);

    return function () {
        return gulp.src(src)
            .pipe(named())
            .pipe(webpack(opts))
            .pipe(gulp.dest(dest));
    };
};

module.exports = nodepackJob;
