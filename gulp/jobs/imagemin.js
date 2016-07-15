const gulp = require('gulp');
const path = require('path');
const map = require('map-stream');
const Imagemin = require('imagemin');

function imageminJob(src) {
    return () => gulp.src(src)
        .pipe(map(function (file, done) {
            const imagemin = new Imagemin().src(file.path).dest(file.path);
            const ext = path.extname(file.path);

            switch (ext) {
                case '.jpg':
                case '.jpeg':
                    imagemin.use(Imagemin.jpegtran({progressive: true}));
                    break;

                case '.gif':
                    imagemin.use(Imagemin.gifsicle({interlaced: true}));
                    break;

                case '.png':
                    imagemin.use(Imagemin.optipng({optimizationLevel: 3}));
                    break;

                case '.svg':
                    imagemin.use(Imagemin.svgo());
                    break;
            }

            imagemin.optimize(function (err, file) {
                done(null);
            });
        }));
};

module.exports = imageminJob;
