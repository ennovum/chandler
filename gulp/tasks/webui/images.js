const gulp = require('gulp');
const run = require('run-sequence');

const buildconf = require('./../../../build.js');
const plugins = {
    imagemin: require('./../../plugins/imagemin.js')
};

const src = buildconf.path.root + buildconf.dir.src;
const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;
const webui = buildconf.dir.webui;

gulp.task(
    'webui.images:build',
    () => gulp.src(src + webui + '/assets/images/*')
        .pipe(gulp.dest(dev + webui + '/assets/images')));

gulp.task(
    'webui.images:dev',
    () => gulp.watch(src + webui + '/assets/images/*')
        .on('ready', () => run('webui.images:build'))
        .on('change', () => run('webui.images:build')));

gulp.task(
    'webui.images:dist',
    () => gulp.src(src + webui + '/assets/images/*')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(dist + webui + '/assets/images')));

