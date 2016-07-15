const gulp = require('gulp');
const minify = require('gulp-minify-css');

function compressCSSJob(src, dest) {
    return () => gulp.src(src)
        .pipe(minify({keepBreaks:true}))
        .pipe(gulp.dest(dest));
};

module.exports = compressCSSJob;
