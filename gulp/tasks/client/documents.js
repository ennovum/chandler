const gulp = require('gulp');

const config = require('./../../../gulpconfig.js');
const jobs = {
    watch: require('./../../jobs/watch.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const client = config.dir.client;

gulp.task(
    'client.documents:build',
    () => gulp.src(src + client + '/*.html')
    	.pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.documents:dev',
    jobs.watch(src + client + '/*.html', {tasks: ['client.documents:build']}));
