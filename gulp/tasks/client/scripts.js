const gulp = require('gulp');
const named = require('vinyl-named');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const buildconfig = require('./../../../buildconfig.js');
const plugins = {
    webpack: require('./../../plugins/webpack.js'),
    eslint: require('./../../plugins/eslint.js'),
    uglifyJs: require('./../../plugins/uglify-js.js')
};

const src = buildconfig.path.root + buildconfig.dir.src;
const dev = buildconfig.path.root + buildconfig.dir.dev;
const dist = buildconfig.path.root + buildconfig.dir.dist;
const client = buildconfig.dir.client;

const dev2src = path.relative(dev, src).replace('\\', '/');
const sourceRoot = dev2src + client;

const build = process.env.npm_package_config_build;
const config = src + client + '/config/config-' + build + '.js'

gulp.task(
    'client.scripts:build',
    () => gulp.src(src + client + '/*.js')
        .pipe(named())
        .pipe(plugins.webpack({resolve: {alias: {'config': config}}}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write({sourceRoot: sourceRoot}))
        .pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.scripts:dev',
    () => gulp.src(src + client + '/*.js')
        .pipe(named())
        .pipe(plugins.webpack({watch: true, resolve: {alias: {'config': config}}}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write({sourceRoot: sourceRoot}))
        .pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.scripts:lint',
    () => gulp.src(src + client + '/**/*.js')
        .pipe(plugins.eslint()));

gulp.task(
    'client.scripts:dist',
    () => gulp.src(src + client + '/*.js')
        .pipe(named())
        .pipe(plugins.webpack({resolve: {alias: {'config': config}}}))
        .pipe(plugins.uglifyJs())
        .pipe(gulp.dest(dist + client + '/')));
