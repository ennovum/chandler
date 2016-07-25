const gulp = require('gulp');
const run = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const config = require('./../../../buildconfig.js');
const plugins = {
    sass: require('./../../plugins/sass.js'),
    autoprefixer: require('./../../plugins/autoprefixer.js'),
    cleanCss: require('./../../plugins/clean-css.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const dist = config.path.root + config.dir.dist;
const client = config.dir.client;
const dev2src = path.relative(dev, src).replace('\\', '/');

gulp.task(
    'client.styles:build',
    () => gulp.src(src + client + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(sourcemaps.write({sourceRoot: dev2src + client}))
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
