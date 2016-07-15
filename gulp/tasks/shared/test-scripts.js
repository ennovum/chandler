const gulp = require('gulp');

const config = require('./../../../gulpconfig.js');
const jobs = {
    nodepack: require('./../../jobs/nodepack.js'),
    mocha: require('./../../jobs/mocha.js'),
    watch: require('./../../jobs/watch.js')
};

const src = config.path.root + config.dir.src;
const test = config.path.root + config.dir.test;
const shared = config.dir.shared;

gulp.task(
    'shared.test-scripts:build',
    jobs.nodepack(src + shared + '/**/*.test.js', test + shared + '/', {target: 'node'}));

gulp.task(
    'shared.test-scripts:start',
    jobs.mocha(test + shared + '/**/*.js'));

gulp.task(
    'shared.test-scripts:dev',
    jobs.watch(src + shared + '/**/*.test.js', {tasks: ['shared.test-scripts:build', 'shared.test-scripts:start']}));
