const gulp = require('gulp');
const run = require('run-sequence');

const config = require('./../../../gulpconfig.js');
const plugins = {
    sass: require('./../../plugins/sass.js'),
    autoprefixer: require('./../../plugins/autoprefixer.js'),
    cleanCss: require('./../../plugins/clean-css.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const dist = config.path.root + config.dir.dist;
const client = config.dir.client;

gulp.task(
    'client.styles:build',
    () => gulp.src(src + client + '/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
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
