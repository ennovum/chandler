const gulp = require('gulp');

const config = require('./../../buildconfig.js');
const jobs = {
    clear: require('./../jobs/clear.js'),
    run: require('./../jobs/run.js')
};

const dev = config.path.root + config.dir.dev;
const dist = config.path.root + config.dir.dist;
const client = config.dir.client;

require('./client/documents.js');
require('./client/scripts.js');
require('./client/styles.js');
require('./client/images.js');

gulp.task(
    'client:clear',
    jobs.clear(dev + client, dist + client));

gulp.task(
    'client:build',
    jobs.run([
        'client.documents:build',
        'client.scripts:build',
        'client.styles:build',
        'client.images:build'
    ]));

gulp.task(
    'client:dev',
    jobs.run([
        'client.documents:dev',
        'client.scripts:dev',
        'client.styles:dev',
        'client.images:dev'
    ]));

gulp.task(
    'client:lint',
    jobs.run('client.scripts:lint'));

gulp.task(
    'client:dist',
    jobs.run([
        'client.documents:dist',
        'client.scripts:dist',
        'client.styles:dist',
        'client.images:dist'
    ]));
