const gulp = require('gulp');
const run = require('run-sequence');

const buildconf = require('./../../../build.js');

const src = buildconf.path.root + buildconf.dir.src;
const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;
const client = buildconf.dir.client;

gulp.task(
    'client.documents:build',
    () => gulp.src(src + client + '/*.html')
        .pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.documents:dev',
    () => gulp.watch(src + client + '/*.html')
        .on('ready', () => run('client.documents:build'))
        .on('change', () => run('client.documents:build')));

gulp.task(
    'client.documents:dist',
    () => gulp.src(src + client + '/*.html')
        .pipe(gulp.dest(dist + client + '/')));

