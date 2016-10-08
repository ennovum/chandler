const gulp = require('gulp');
const run = require('run-sequence');

const buildconf = require('./../../../build.js');

const src = buildconf.path.root + buildconf.dir.src;
const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;
const webui = buildconf.dir.webui;

gulp.task(
    'webui.documents:build',
    () => gulp.src(src + webui + '/*.html')
        .pipe(gulp.dest(dev + webui + '/')));

gulp.task(
    'webui.documents:dev',
    () => gulp.watch(src + webui + '/*.html')
        .on('ready', () => run('webui.documents:build'))
        .on('change', () => run('webui.documents:build')));

gulp.task(
    'webui.documents:dist',
    () => gulp.src(src + webui + '/*.html')
        .pipe(gulp.dest(dist + webui + '/')));

