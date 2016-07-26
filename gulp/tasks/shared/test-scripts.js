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
const shared = buildconf.dir.shared;

gulp.task(
    'shared.test-scripts:build',
    () => gulp.src(src + shared + '/**/*.test.js')
        .pipe(named())
    	.pipe(plugins.nodepack())
    	.pipe(gulp.dest(test + shared + '/')));

gulp.task(
    'shared.test-scripts:start',
    () => gulp.src(test + shared + '/**/*.js')
        .pipe(plugins.mocha()));

gulp.task(
    'shared.test-scripts:dev',
    () => gulp.watch(src + shared + '/**/*.test.js')
        .on('ready', () => run('shared.test-scripts:build', 'shared.test-scripts:start'))
        .on('change', () => run('shared.test-scripts:build', 'shared.test-scripts:start')));
