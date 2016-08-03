const gulp = require('gulp');

const buildconf = require('./../../build.js');
const jobs = {
    run: require('./../jobs/run.js')
};

require('./shared/scripts.js');
require('./shared/test-scripts.js');

const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;
const shared = buildconf.dir.shared;

gulp.task(
    'shared:lint',
    jobs.run('shared.scripts:lint'));

gulp.task(
    'shared:test',
    jobs.run('shared.test-scripts:test'));
