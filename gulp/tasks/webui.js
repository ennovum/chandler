const gulp = require('gulp');

const buildconf = require('./../../build.js');
const jobs = {
    clear: require('./../jobs/clear.js'),
    run: require('./../jobs/run.js')
};

const dev = buildconf.path.root + buildconf.dir.dev;
const dist = buildconf.path.root + buildconf.dir.dist;
const webui = buildconf.dir.webui;

require('./webui/documents.js');
require('./webui/scripts.js');
require('./webui/styles.js');
require('./webui/images.js');
require('./webui/test-scripts.js');

gulp.task(
    'webui:clear',
    jobs.clear(dev + webui, dist + webui));

gulp.task(
    'webui:build',
    jobs.run([
        'webui.documents:build',
        'webui.scripts:build',
        'webui.styles:build',
        'webui.images:build'
    ]));

gulp.task(
    'webui:dev',
    jobs.run([
        'webui.documents:dev',
        'webui.scripts:dev',
        'webui.styles:dev',
        'webui.images:dev'
    ], [
        'webui.test-scripts:dev'
    ]));

gulp.task(
    'webui:lint',
    jobs.run('webui.scripts:lint'));

gulp.task(
    'webui:test',
    jobs.run('webui.test-scripts:test'));

gulp.task(
    'webui:dist',
    jobs.run([
        'webui.documents:dist',
        'webui.scripts:dist',
        'webui.styles:dist',
        'webui.images:dist'
    ]));
