const gulp = require('gulp');

const config = require('./../../../gulpconfig.js');
const jobs = {
    webpack: require('./../../jobs/webpack.js'),
    mocha: require('./../../jobs/mocha.js'),
    watch: require('./../../jobs/watch.js')
};

const src = config.path.root + config.dir.src;
const test = config.path.root + config.dir.test;
const client = config.dir.client;

gulp.task(
    'client.test-scripts:build',
    jobs.webpack(src + client + '/**/*.test.js', test + client + '/', {target: 'web'}));

gulp.task(
    'client.test-scripts:start',
    jobs.mocha(test + client + '/**/*.js'));

gulp.task(
    'client.test-scripts:dev',
    jobs.watch(src + client + '/**/*.test.js', {tasks: ['client.test-scripts:build', 'client.test-scripts:start']}));
