const gulp = require('gulp');
const named = require('vinyl-named');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const config = require('./../../../gulpconfig.js');
const plugins = {
    nodepack: require('./../../plugins/nodepack.js'),
    eslint: require('./../../plugins/eslint.js'),
    uglifyJs: require('./../../plugins/uglify-js.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const dist = config.path.root + config.dir.dist;
const server = config.dir.server;
const dev2src = path.relative(dev, src).replace('\\', '/');

gulp.task(
    'server.scripts:build',
    () => gulp.src(src + server + '/*.js')
        .pipe(named())
        .pipe(plugins.nodepack())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write({sourceRoot: dev2src + server}))
        .pipe(gulp.dest(dev + server + '/')));

gulp.task(
    'server.scripts:dev',
    () => gulp.src(src + server + '/*.js')
        .pipe(named())
        .pipe(plugins.nodepack({watch: true}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write({sourceRoot: dev2src + server}))
        .pipe(gulp.dest(dev + server + '/')));

gulp.task(
    'server.scripts:lint',
    () => gulp.src(src + server + '/**/*.js')
        .pipe(plugins.eslint()));

gulp.task(
    'server.scripts:dist',
    () => gulp.src(src + server + '/*.js')
        .pipe(named())
        .pipe(plugins.nodepack())
        .pipe(plugins.uglifyJs())
        .pipe(gulp.dest(dist + server + '/')));
