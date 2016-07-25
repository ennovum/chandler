const gulp = require('gulp');

const config = require('./../../buildconfig.js');
const jobs = {
    run: require('./../jobs/run.js')
};

require('./client/test-scripts.js');
require('./server/test-scripts.js');
require('./shared/test-scripts.js');

gulp.task(
    'test:build',
    jobs.run(
        'client.test-scripts:build',
        'server.test-scripts:build',
        'shared.test-scripts:build'));

gulp.task(
    'test:start',
    jobs.run(
        'client.test-scripts:start',
        'server.test-scripts:start',
        'shared.test-scripts:start'));

gulp.task(
    'test:dev',
    jobs.run(
        'client.test-scripts:dev',
        'server.test-scripts:dev',
        'shared.test-scripts:dev'));
