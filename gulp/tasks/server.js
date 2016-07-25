const gulp = require('gulp');

const config = require('./../../buildconfig.js');
const jobs = {
    clear: require('./../jobs/clear.js'),
    run: require('./../jobs/run.js'),
    nodemon: require('./../jobs/nodemon.js')
};

require('./server/scripts.js');

const dev = config.path.root + config.dir.dev;
const dist = config.path.root + config.dir.dist;
const server = config.dir.server;

gulp.task(
    'server:clear',
    jobs.clear(dev + server, dist + server));

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
    jobs.nodemon(dev + server + '/index.js', {watch: dev + server}));

gulp.task(
    'server:dist',
    jobs.run('server.scripts:dist'));
