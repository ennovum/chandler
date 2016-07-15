const gulp = require('gulp');

const config = require('./../../../gulpconfig.js');
const jobs = {
    webpack: require('./../../jobs/webpack.js'),
    eslint: require('./../../jobs/eslint.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const client = config.dir.client;

gulp.task(
    'client.scripts:build',
    jobs.webpack(src + client + '/*.js', dev + client + '/', {target: 'web'}));

gulp.task(
    'client.scripts:dev',
    jobs.webpack(src + client + '/*.js', dev + client + '/', {target: 'web', watch: true}));

gulp.task(
    'client.scripts:lint',
    jobs.eslint(src + client + '/**/*.js'));
