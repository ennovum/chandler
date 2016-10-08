const gulp = require('gulp');
const named = require('vinyl-named');
const run = require('run-sequence');

const buildconf = require('./../../../build.js');
const plugins = {
    webpack: require('./../../plugins/webpack.js'),
    tape: require('./../../plugins/tape.js')
};

const src = buildconf.path.root + buildconf.dir.src;
const webui = buildconf.dir.webui;

gulp.task(
    'webui.test-scripts:test',
    () => gulp.src(src + webui + '/**/*.test.js')
        .pipe(named())
        .pipe(plugins.webpack())
        .pipe(plugins.tape()));

gulp.task(
    'webui.test-scripts:dev',
    () => gulp.src(src + webui + '/**/*.test.js')
        .pipe(named())
        .pipe(plugins.webpack({watch: true}))
        .pipe(plugins.tape()));
