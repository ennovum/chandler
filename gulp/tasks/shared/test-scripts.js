const gulp = require('gulp');
const named = require('vinyl-named');
const run = require('run-sequence');

const buildconf = require('./../../../build.js');
const plugins = {
    nodepack: require('./../../plugins/nodepack.js'),
    tape: require('./../../plugins/tape.js')
};

const src = buildconf.path.root + buildconf.dir.src;
const shared = buildconf.dir.shared;

gulp.task(
    'shared.test-scripts:start',
    () => gulp.src(src + shared + '/**/*.test.js')
        .pipe(named())
        .pipe(plugins.nodepack())
        .pipe(plugins.tape()));

gulp.task(
    'shared.test-scripts:dev',
    () => gulp.src(src + shared + '/**/*.test.js')
        .pipe(named())
        .pipe(plugins.nodepack({watch: true}))
        .pipe(plugins.tape()));
