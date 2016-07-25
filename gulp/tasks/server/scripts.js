const gulp = require('gulp');
const named = require('vinyl-named');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const buildconfig = require('./../../../buildconfig.js');
const plugins = {
    nodepack: require('./../../plugins/nodepack.js'),
    eslint: require('./../../plugins/eslint.js'),
    uglifyJs: require('./../../plugins/uglify-js.js')
};

const src = buildconfig.path.root + buildconfig.dir.src;
const dev = buildconfig.path.root + buildconfig.dir.dev;
const dist = buildconfig.path.root + buildconfig.dir.dist;
const server = buildconfig.dir.server;

const dev2src = path.relative(dev, src).replace('\\', '/');
const sourceRoot = dev2src + server;

const build = process.env.npm_package_config_build;
const config = src + server + '/config/config-' + build + '.js'

gulp.task(
    'server.scripts:build',
    () => gulp.src(src + server + '/*.js')
        .pipe(named())
        .pipe(plugins.nodepack({resolve: {alias: {'config': config}}}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write({sourceRoot: sourceRoot}))
        .pipe(gulp.dest(dev + server + '/')));

gulp.task(
    'server.scripts:dev',
    () => gulp.src(src + server + '/*.js')
        .pipe(named())
        .pipe(plugins.nodepack({watch: true, resolve: {alias: {'config': config}}}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write({sourceRoot: sourceRoot}))
        .pipe(gulp.dest(dev + server + '/')));

gulp.task(
    'server.scripts:lint',
    () => gulp.src(src + server + '/**/*.js')
        .pipe(plugins.eslint()));

gulp.task(
    'server.scripts:dist',
    () => gulp.src(src + server + '/*.js')
        .pipe(named())
        .pipe(plugins.nodepack({resolve: {alias: {'config': config}}}))
        .pipe(plugins.uglifyJs())
        .pipe(gulp.dest(dist + server + '/')));
