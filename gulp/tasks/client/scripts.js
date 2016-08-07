const gulp = require('gulp');
const named = require('vinyl-named');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const buildconf = require('./../../../build.js');
const plugins = {
    webpack: require('./../../plugins/webpack.js'),
    eslint: require('./../../plugins/eslint.js'),
    uglifyJs: require('./../../plugins/uglify-js.js')
};

const conf = buildconf.path.root + buildconf.dir.conf;
const lang = buildconf.path.root + buildconf.dir.lang;
const src = buildconf.path.root + buildconf.dir.src;
const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;
const client = buildconf.dir.client;

const confName = process.env.npm_package_config_conf;
const confFile = conf + client + '/' + confName + '.js';

const langName = process.env.npm_package_config_lang;
const langFile = lang + client + '/' + langName + '.js';

const alias = {'conf': confFile, 'lang': langFile};
const resolve = {alias};

const dev2src = path.relative(dev, src).replace('\\', '/');
const sourcemapsRoot = dev2src + client;

gulp.task(
    'client.scripts:build',
    () => gulp.src(src + client + '/*.js')
        .pipe(named())
        .pipe(plugins.webpack({resolve}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write({sourceRoot: sourcemapsRoot}))
        .pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.scripts:dev',
    () => gulp.src(src + client + '/*.js')
        .pipe(named())
        .pipe(plugins.webpack({watch: true, resolve}))
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
        .pipe(plugins.webpack({resolve}))
        .pipe(plugins.uglifyJs())
        .pipe(gulp.dest(dist + client + '/')));
