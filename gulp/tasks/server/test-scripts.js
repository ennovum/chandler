const gulp = require('gulp');

const config = require('./../../../gulpconfig.js');
const jobs = {
    nodepack: require('./../../jobs/nodepack.js'),
    mocha: require('./../../jobs/mocha.js'),
    watch: require('./../../jobs/watch.js')
};

const src = config.path.root + config.dir.src;
const test = config.path.root + config.dir.test;
const server = config.dir.server;

gulp.task(
    'server.test-scripts:build',
    jobs.nodepack(src + server + '/**/*.test.js', test + server + '/', {target: 'node'}));

gulp.task(
    'server.test-scripts:start',
    jobs.mocha(test + server + '/**/*.js'));

gulp.task(
    'server.test-scripts:dev',
    jobs.watch(src + server + '/**/*.test.js', {tasks: ['server.test-scripts:build', 'server.test-scripts:start']}));
