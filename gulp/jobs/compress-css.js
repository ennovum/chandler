var gulp = require("gulp");
var minify = require("gulp-minify-css");

function compressCSSJob(src, dest) {
    return function () {
        return gulp.src(src)
            .pipe(minify({keepBreaks:true}))
            .pipe(gulp.dest(dest));
    };
};

module.exports = compressCSSJob;
