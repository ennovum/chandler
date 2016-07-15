const gulp = require('gulp');
const paths = require('vinyl-paths');
const del = require('del');

function cleanJob(src) {
    return () => gulp.src(src, {read: false})
        .pipe(paths(del));
};

module.exports = cleanJob;
