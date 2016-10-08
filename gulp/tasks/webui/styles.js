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
const webui = buildconf.dir.webui;

const dev2src = path.relative(dev, src).replace('\\', '/');
const sourcemapsRoot = dev2src + webui;

gulp.task(
    'webui.styles:build',
    () => gulp.src(src + webui + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(sourcemaps.write({sourceRoot: sourcemapsRoot}))
        .pipe(gulp.dest(dev + webui + '/')));

gulp.task(
    'webui.styles:dev',
    () => gulp.watch(src + webui + '/**/*.scss')
        .on('ready', () => run('webui.styles:build'))
        .on('change', () => run('webui.styles:build')));

gulp.task(
    'webui.styles:dist',
    () => gulp.src(src + webui + '/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cleanCss())
        .pipe(gulp.dest(dist + webui + '/')));
