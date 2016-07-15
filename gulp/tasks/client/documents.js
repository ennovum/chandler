const gulp = require('gulp');

const config = require('./../../../gulpconfig.js');
const jobs = {
    copy: require('./../../jobs/copy.js'),
    watch: require('./../../jobs/watch.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const client = config.dir.client;

gulp.task(
    'client.documents:build',
    jobs.copy(src + client + '/*.html', dev + client + '/'));

gulp.task(
    'client.documents:dev',
    jobs.watch(src + client + '/*.html', {tasks: ['client.documents:build']}));
