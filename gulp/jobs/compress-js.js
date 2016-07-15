const gulp = require('gulp');
const uglify = require('gulp-uglify');

function compressJSJob(src, dest) {
    return () => gulp.src(src)
        .pipe(uglify())
        .pipe(gulp.dest(dest));
};

module.exports = compressJSJob;
