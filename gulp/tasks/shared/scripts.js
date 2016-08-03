const gulp = require('gulp');

const buildconf = require('./../../../build.js');
const plugins = {
    eslint: require('./../../plugins/eslint.js')
};

const src = buildconf.path.root + buildconf.dir.src;
const shared = buildconf.dir.shared;

gulp.task(
    'shared.scripts:lint',
    () => gulp.src(src + shared + '/**/*.js')
        .pipe(plugins.eslint()));
