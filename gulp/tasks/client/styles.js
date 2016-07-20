const gulp = require('gulp');

const config = require('./../../../gulpconfig.js');
const jobs = {
    watch: require('./../../jobs/watch.js')
};
const plugins = {
    sass: require('./../../plugins/sass.js'),
    autoprefixer: require('./../../plugins/autoprefixer.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const client = config.dir.client;

gulp.task(
    'client.styles:build',
    () => gulp.src(src + client + '/*.scss')
    	.pipe(plugins.sass())
    	.pipe(plugins.autoprefixer())
    	.pipe(gulp.dest(dev + client + '/')));

gulp.task(
    'client.styles:dev',
    jobs.watch(src + client + '/**/*.scss', {tasks: ['client.styles:build']}));
