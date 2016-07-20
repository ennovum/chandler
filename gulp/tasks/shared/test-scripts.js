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
const shared = config.dir.shared;

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
    jobs.watch(src + shared + '/**/*.test.js', {tasks: ['shared.test-scripts:build', 'shared.test-scripts:start']}));
