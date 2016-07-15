const gulp = require('gulp');
const run = require('run-sequence');
const _ = require('lodash');

const conf = _.get(require('./../../gulpconfig.js'), 'watch', {});

function watchTask(src, opts) {
    opts = _.extend({}, conf, opts);

    const types = opts && opts.types || ['added', 'changed', 'deleted'];
    const tasks = opts && opts.tasks || null;
    const start = opts && opts.start || true;

    return () => {
        const watcher = gulp.watch(src, opts, function (event) {
            if (tasks && ~types.indexOf(event.type)) {
                run.apply(null, _.clone(tasks, true));
            }
        });

        if (tasks && start) {
            run.apply(null, _.clone(tasks, true));
        }
    };
};

module.exports = watchTask;
