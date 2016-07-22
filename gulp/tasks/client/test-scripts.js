const gulp = require('gulp');
const named = require('vinyl-named');
const run = require('run-sequence');

const config = require('./../../../gulpconfig.js');
const plugins = {
    webpack: require('./../../plugins/webpack.js'),
    mocha: require('./../../plugins/mocha.js')
};

const src = config.path.root + config.dir.src;
const test = config.path.root + config.dir.test;
const client = config.dir.client;

gulp.task(
    'client.test-scripts:build',
    () => gulp.src(src + client + '/**/*.test.js')
        .pipe(named())
        .pipe(plugins.webpack())
        .pipe(gulp.dest(test + client + '/')));

gulp.task(
    'client.test-scripts:start',
    () => gulp.src(test + client + '/**/*.js')
        .pipe(plugins.mocha()));

gulp.task(
    'client.test-scripts:dev',
    () => gulp.watch(src + client + '/**/*.test.js')
        .on('ready', () => run('client.test-scripts:build', 'client.test-scripts:start'))
        .on('change', () => run('client.test-scripts:build', 'client.test-scripts:start')));
