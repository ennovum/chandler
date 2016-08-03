const gulp = require('gulp');
const named = require('vinyl-named');
const run = require('run-sequence');

const buildconf = require('./../../../build.js');
const plugins = {
    webpack: require('./../../plugins/webpack.js'),
    tape: require('./../../plugins/tape.js')
};

const src = buildconf.path.root + buildconf.dir.src;
const client = buildconf.dir.client;

gulp.task(
    'client.test-scripts:test',
    () => gulp.src(src + client + '/**/*.test.js')
        .pipe(named())
        .pipe(plugins.webpack())
        .pipe(plugins.tape()));

gulp.task(
    'client.test-scripts:dev',
    () => gulp.src(src + client + '/**/*.test.js')
        .pipe(named())
        .pipe(plugins.webpack({watch: true}))
        .pipe(plugins.tape()));
