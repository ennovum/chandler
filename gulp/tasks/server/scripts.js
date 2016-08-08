const gulp = require('gulp');
const named = require('vinyl-named');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const buildconf = require('./../../../build.js');
const plugins = {
    nodepack: require('./../../plugins/nodepack.js'),
    eslint: require('./../../plugins/eslint.js'),
    uglifyJs: require('./../../plugins/uglify-js.js')
};

const conf = buildconf.path.root + buildconf.dir.conf;
const src = buildconf.path.root + buildconf.dir.src;
const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;
const server = buildconf.dir.server;
const shared = buildconf.dir.shared;
const modules = buildconf.dir.modules;

const confName = process.env.npm_package_config_conf;
const confFile = conf + server + '/' + confName + '.js';

const nodepackRoot = [src, src + server + modules, src + shared + modules];
const nodepackAlias = {'conf': confFile};
const nodepackResolve = {root: nodepackRoot, alias: nodepackAlias};

const dev2src = path.relative(dev, src).replace('\\', '/');
const sourcemapsRoot = dev2src + server;

gulp.task(
    'server.scripts:build',
    () => gulp.src(src + server + '/*.js')
        .pipe(named())
        .pipe(plugins.nodepack({resolve: nodepackResolve}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write({sourceRoot: sourcemapsRoot}))
        .pipe(gulp.dest(dev + server + '/')));

gulp.task(
    'server.scripts:dev',
    () => gulp.src(src + server + '/*.js')
        .pipe(named())
        .pipe(plugins.nodepack({watch: true, resolve: nodepackResolve}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write({sourceRoot: sourcemapsRoot}))
        .pipe(gulp.dest(dev + server + '/')));

gulp.task(
    'server.scripts:lint',
    () => gulp.src(src + server + '/**/*.js')
        .pipe(plugins.eslint()));

gulp.task(
    'server.scripts:dist',
    () => gulp.src(src + server + '/*.js')
        .pipe(named())
        .pipe(plugins.nodepack({resolve: nodepackResolve}))
        .pipe(plugins.uglifyJs())
        .pipe(gulp.dest(dist + server + '/')));
