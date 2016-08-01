const gulp = require('gulp');
const named = require('vinyl-named');
const run = require('run-sequence');

const buildconf = require('./../../../build.js');
const plugins = {
    nodepack: require('./../../plugins/nodepack.js'),
    tape: require('./../../plugins/tape.js')
};

const src = buildconf.path.root + buildconf.dir.src;
const server = buildconf.dir.server;

gulp.task(
    'server.test-scripts:start',
    () => gulp.src(src + server + '/**/*.test.js')
        .pipe(named())
        .pipe(plugins.nodepack())
        .pipe(plugins.tape()));

gulp.task(
    'server.test-scripts:dev',
    () => gulp.src(src + server + '/**/*.test.js')
        .pipe(named())
        .pipe(plugins.nodepack({watch: true}))
        .pipe(plugins.tape()));
