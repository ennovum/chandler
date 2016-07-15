const gulp = require('gulp');

const config = require('./../../../gulpconfig.js');
const jobs = {
    sass: require('./../../jobs/sass.js'),
    watch: require('./../../jobs/watch.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const client = config.dir.client;

gulp.task(
    'client.styles:build',
    jobs.sass(src + client + '/*.scss', dev + client + '/'));

gulp.task(
    'client.styles:dev',
    jobs.watch(src + client + '/**/*.scss', {tasks: ['client.styles:build']}));
