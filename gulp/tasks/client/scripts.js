const gulp = require('gulp');
const named = require('vinyl-named');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const buildconf = require('./../../../buildconf.js');
const plugins = {
    webpack: require('./../../plugins/webpack.js'),
    eslint: require('./../../plugins/eslint.js'),
    uglifyJs: require('./../../plugins/uglify-js.js')
};

const conf = buildconf.path.root + buildconf.dir.conf;
const src = buildconf.path.root + buildconf.dir.src;
const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;
const client = buildconf.dir.client;

const build = process.env.npm_package_config_build;
const confFile = conf + client + '/' + build + '.js'

const dev2src = path.relative(dev, src).replace('\\', '/');
const sourcemapsRoot = dev2src + client;

gulp.task(
    'client.scripts:build',
    () => gulp.src(src + client + '/*.js')
        .pipe(named())
        .pipe(plugins.webpack({resolve: {alias: {'config': confFile}}}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write({sourceRoot: sourcemapsRoot}))
        .pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.scripts:dev',
    () => gulp.src(src + client + '/*.js')
        .pipe(named())
        .pipe(plugins.webpack({watch: true, resolve: {alias: {'config': confFile}}}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write({sourceRoot: sourcemapsRoot}))
        .pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.scripts:lint',
    () => gulp.src(src + client + '/**/*.js')
        .pipe(plugins.eslint()));

gulp.task(
    'client.scripts:dist',
    () => gulp.src(src + client + '/*.js')
        .pipe(named())
        .pipe(plugins.webpack({resolve: {alias: {'config': confFile}}}))
        .pipe(plugins.uglifyJs())
        .pipe(gulp.dest(dist + client + '/')));
