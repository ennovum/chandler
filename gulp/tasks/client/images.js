const gulp = require('gulp');
const run = require('run-sequence');

const buildconf = require('./../../../build.js');
const plugins = {
    imagemin: require('./../../plugins/imagemin.js')
};

const src = buildconf.path.root + buildconf.dir.src;
const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;
const client = buildconf.dir.client;

gulp.task(
    'client.images:build',
    () => gulp.src(src + client + '/assets/images/*')
        .pipe(gulp.dest(dev + client + '/assets/images')));

gulp.task(
    'client.images:dev',
    () => gulp.watch(src + client + '/assets/images/*')
        .on('ready', () => run('client.images:build'))
        .on('change', () => run('client.images:build')));

gulp.task(
    'client.images:dist',
    () => gulp.src(src + client + '/assets/images/*')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(dist + client + '/assets/images')));

