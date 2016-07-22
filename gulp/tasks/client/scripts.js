const gulp = require('gulp');
const named = require('vinyl-named');

const config = require('./../../../gulpconfig.js');
const plugins = {
    webpack: require('./../../plugins/webpack.js'),
    eslint: require('./../../plugins/eslint.js'),
    uglifyJs: require('./../../plugins/uglify-js.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const dist = config.path.root + config.dir.dist;
const client = config.dir.client;

gulp.task(
    'client.scripts:build',
    () => gulp.src(src + client + '/*.js')
        .pipe(named())
        .pipe(plugins.webpack())
        .pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.scripts:dev',
    () => gulp.src(src + client + '/*.js')
        .pipe(named())
        .pipe(plugins.webpack({watch: true}))
        .pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.scripts:lint',
    () => gulp.src(src + client + '/**/*.js')
        .pipe(plugins.eslint()));

gulp.task(
    'client.scripts:dist',
    () => gulp.src(src + client + '/*.js')
        .pipe(named())
        .pipe(plugins.webpack())
        .pipe(plugins.uglifyJs())
        .pipe(gulp.dest(dist + client + '/')));
