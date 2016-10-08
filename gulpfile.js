const gulp = require('gulp');

const jobs = {
    run: require('./gulp/jobs/run.js')
};

require('./gulp/tasks/webui.js');
require('./gulp/tasks/server.js');
require('./gulp/tasks/shared.js');

gulp.task(
    'clear',
    jobs.run(['webui:clear', 'server:clear']));

gulp.task(
    'build',
    jobs.run(
        ['webui:clear', 'server:clear'],
        ['webui:build', 'server:build']));

gulp.task(
    'server',
    jobs.run('server:start'));

gulp.task(
    'start',
    jobs.run(
        ['webui:clear', 'server:clear'],
        'server:start',
        ['webui:build', 'server:build']));

gulp.task(
    'dev',
    jobs.run(
        ['webui:clear', 'server:clear'],
        'server:start',
        ['webui:dev', 'server:dev']));

gulp.task(
    'lint',
    jobs.run('webui:lint', 'server:lint', 'shared:lint'));

gulp.task(
    'test',
    jobs.run(
        'lint',
        ['webui:test', 'server:test', 'shared:test']));

gulp.task(
    'dist',
    jobs.run(
        ['webui:clear', 'server:clear'],
        ['webui:dist', 'server:dist']));
