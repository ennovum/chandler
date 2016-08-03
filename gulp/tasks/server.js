const gulp = require('gulp');

const buildconf = require('./../../build.js');
const jobs = {
    clear: require('./../jobs/clear.js'),
    run: require('./../jobs/run.js'),
    nodemon: require('./../jobs/nodemon.js')
};

require('./server/scripts.js');
require('./server/test-scripts.js');

const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;
const server = buildconf.dir.server;

gulp.task(
    'server:clear',
    jobs.clear(dev + server, dist + server));

gulp.task(
    'server:build',
    jobs.run('server.scripts:build'));

gulp.task(
    'server:dev',
    jobs.run('server.scripts:dev', 'server.test-scripts:dev'));

gulp.task(
    'server:lint',
    jobs.run('server.scripts:lint'));

gulp.task(
    'server:test',
    jobs.run('server.test-scripts:test'));

gulp.task(
    'server:start',
    jobs.nodemon(dev + server + '/index.js', {watch: dev + server}));

gulp.task(
    'server:dist',
    jobs.run('server.scripts:dist'));
