const gulp = require('gulp');
const run = require('run-sequence');

const config = require('./../../../gulpconfig.js');

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const client = config.dir.client;

gulp.task(
    'client.documents:build',
    () => gulp.src(src + client + '/*.html')
    	.pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.documents:dev',
    () => gulp.watch(src + client + '/*.html')
    	.on('change', () => run('client.documents:build')));
