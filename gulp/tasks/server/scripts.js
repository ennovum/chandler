const gulp = require('gulp');

const config = require('./../../../gulpconfig.js');
const jobs = {
    nodepack: require('./../../jobs/nodepack.js'),
    eslint: require('./../../jobs/eslint.js')
};

const src = config.path.root + config.dir.src;
const dev = config.path.root + config.dir.dev;
const server = config.dir.server;

gulp.task(
    'server.scripts:build',
    jobs.nodepack(src + server + '/*.js', dev + server + '/', {target: 'node'}));

gulp.task(
    'server.scripts:dev',
    jobs.nodepack(src + server + '/*.js', dev + server + '/', {target: 'node', watch: true}));

gulp.task(
    'server.scripts:lint',
    jobs.eslint(src + server + '/**/*.js'));
