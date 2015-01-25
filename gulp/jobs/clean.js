var gulp = require("gulp");
var paths = require('vinyl-paths');
var del = require('del');

function cleanJob(src) {
    return function () {
        return gulp.src(src, {read: false})
            .pipe(paths(del));
    };
};

module.exports = cleanJob;
