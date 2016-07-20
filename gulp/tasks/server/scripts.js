const gulp = require('gulp');
const named = require('vinyl-named');

const config = require('./../../../gulpconfig.js');
const plugins = {
    nodepack: require('./../../plugins/nodepack.js'),
    eslint: require('./../../plugins/eslint.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const server = config.dir.server;

gulp.task(
    'server.scripts:build',
    () => gulp.src(src + server + '/*.js')
        .pipe(named())
    	.pipe(plugins.nodepack())
    	.pipe(gulp.dest(dev + server + '/')));

gulp.task(
    'server.scripts:dev',
    () => gulp.src(src + server + '/*.js')
        .pipe(named())
    	.pipe(plugins.nodepack({watch: true}))
    	.pipe(gulp.dest(dev + server + '/')));

gulp.task(
    'server.scripts:lint',
    () => gulp.src(src + server + '/**/*.js')
    	.pipe(plugins.eslint()));
