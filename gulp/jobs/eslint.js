var gulp = require("gulp");
var eslint = require("gulp-eslint");
var _ = require("lodash");

var conf = _.get(require("./../../gulpconfig.js"), "eslint", {});

function eslintJob(src, opts) {
    opts = _.extend(_.extend({}, conf), opts);

    return function () {
        return gulp.src(src)
            .pipe(eslint(opts))
            .pipe(eslint.format());
    };
};

module.exports = eslintJob;
