const gulp = require('gulp');

const config = require('./../../../gulpconfig.js');
const jobs = {
    watch: require('./../../jobs/watch.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const client = config.dir.client;

gulp.task(
    'client.images:build',
    () => gulp.src(src + client + '/assets/images/*')
    	.pipe(gulp.dest(dev + client + '/assets/images')));

gulp.task(
    'client.images:dev',
    jobs.watch(src + client + '/assets/images/*', {tasks: ['client.images:build']}));
