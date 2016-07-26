const gulp = require('gulp');
const named = require('vinyl-named');
const run = require('run-sequence');

const buildconf = require('./../../../buildconf.js');
const plugins = {
    nodepack: require('./../../plugins/nodepack.js'),
    mocha: require('./../../plugins/mocha.js')
};

const src = buildconf.path.root + buildconf.dir.src;
const test = buildconf.path.root + buildconf.dir.test;
const server = buildconf.dir.server;

gulp.task(
    'server.test-scripts:build',
    () => gulp.src(src + server + '/**/*.test.js')
        .pipe(named())
    	.pipe(plugins.nodepack())
    	.pipe(gulp.dest(test + server + '/')));

gulp.task(
    'server.test-scripts:start',
    () => gulp.src(test + server + '/**/*.js')
        .pipe(plugins.mocha()));

gulp.task(
    'server.test-scripts:dev',
    () => gulp.watch(src + server + '/**/*.test.js')
        .on('ready', () => run('server.test-scripts:build', 'server.test-scripts:start'))
        .on('change', () => run('server.test-scripts:build', 'server.test-scripts:start')));
