var gulp = require("gulp");
var uglify = require("gulp-uglify");

function compressJSJob(src, dest) {
    return function () {
        return gulp.src(src)
            .pipe(uglify())
            .pipe(gulp.dest(dest));
    };
};

module.exports = compressJSJob;
