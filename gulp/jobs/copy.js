var gulp = require("gulp");

function copyJob(src, dest) {
    return function () {
        return gulp.src(src)
            .pipe(gulp.dest(dest));
    };
};

module.exports = copyJob;
