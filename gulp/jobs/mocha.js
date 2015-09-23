var gulp = require("gulp");
var _ = require("lodash");
var mocha = require("gulp-mocha");

var conf = _.get(require("./../../gulpconfig.js"), "mocha", {});

function mochaJob(src, opts) {
    opts = _.extend(_.extend({}, conf), opts);

    return function () {
        return gulp.src(src)
            .pipe(mocha(opts));
    };
};

module.exports = mochaJob;
