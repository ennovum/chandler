const gulp = require('gulp');

const jobs = {
    run: require('./gulp/jobs/run.js')
};

require('./gulp/tasks/client.js');
require('./gulp/tasks/server.js');
require('./gulp/tasks/test.js');

gulp.task(
    'clear',
    jobs.run(['client:clear', 'server:clear']));

gulp.task(
    'build',
    jobs.run(
        ['client:clear', 'server:clear'],
        ['client:build', 'server:build']));

gulp.task(
    'server',
    jobs.run('server:start'));

gulp.task(
    'start',
    jobs.run(
        ['client:clear', 'server:clear'],
        'server:start',
        ['client:build', 'server:build']));

gulp.task(
    'dev',
    jobs.run(
        ['client:clear', 'server:clear'],
        'server:start',
        ['client:dev', 'server:dev']));

gulp.task(
    'lint',
    jobs.run('client:lint', 'server:lint'));

gulp.task(
    'test',
    jobs.run('lint', 'test:build', 'test:start'));

gulp.task(
    'dist',
    jobs.run(
        ['client:clear', 'server:clear'],
        ['client:dist', 'server:dist']));
