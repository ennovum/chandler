const gulp = require('gulp');
const run = require('run-sequence');

const config = require('./../../../gulpconfig.js');

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const client = config.dir.client;

gulp.task(
    'client.images:build',
    () => gulp.src(src + client + '/assets/images/*')
    	.pipe(gulp.dest(dev + client + '/assets/images')));

gulp.task(
    'client.images:dev',
    () => gulp.watch(src + client + '/assets/images/*')
    	.on('change', () => run('client.images:build')));
