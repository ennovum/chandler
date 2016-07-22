const gulp = require('gulp');

const config = require('./../../gulpconfig.js');
const jobs = {
    run: require('./../jobs/run.js'),
    nodemon: require('./../jobs/nodemon.js')
};

require('./server/scripts.js');

const dev = config.path.root + config.dir.dev;
const server = config.dir.server;

gulp.task(
    'server:build',
    jobs.run('server.scripts:build'));

gulp.task(
    'server:dev',
    jobs.run('server.scripts:dev'));

gulp.task(
    'server:lint',
    jobs.run('server.scripts:lint'));

gulp.task(
    'server:start',
    jobs.nodemon(dev + server + '/index.js'));

gulp.task(
    'server:dist',
    jobs.run('server.scripts:dist'));
