const gulp = require('gulp');
const run = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const buildconf = require('./../../../build.js');
const plugins = {
    sass: require('./../../plugins/sass.js'),
    autoprefixer: require('./../../plugins/autoprefixer.js'),
    cleanCss: require('./../../plugins/clean-css.js')
};

const src = buildconf.path.root + buildconf.dir.src;
const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;
const client = buildconf.dir.client;

const dev2src = path.relative(dev, src).replace('\\', '/');
const sourcemapsRoot = dev2src + client;

gulp.task(
    'client.styles:build',
    () => gulp.src(src + client + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(sourcemaps.write({sourceRoot: sourcemapsRoot}))
        .pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.styles:dev',
    () => gulp.watch(src + client + '/**/*.scss')
        .on('ready', () => run('client.styles:build'))
        .on('change', () => run('client.styles:build')));

gulp.task(
    'client.styles:dist',
    () => gulp.src(src + client + '/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cleanCss())
        .pipe(gulp.dest(dist + client + '/')));