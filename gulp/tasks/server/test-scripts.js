const gulp = require('gulp');
const named = require('vinyl-named');

const config = require('./../../../gulpconfig.js');
const jobs = {
    watch: require('./../../jobs/watch.js')
};
const plugins = {
    nodepack: require('./../../plugins/nodepack.js'),
    mocha: require('./../../plugins/mocha.js')
};

const src = config.path.root + config.dir.src;
const test = config.path.root + config.dir.test;
const server = config.dir.server;

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
    jobs.watch(src + server + '/**/*.test.js', {tasks: ['server.test-scripts:build', 'server.test-scripts:start']}));
