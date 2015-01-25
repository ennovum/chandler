var gulp = require('gulp');

function watchTask(src, params) {
    var types = params && params.types || ['added', 'changed', 'deleted'];
    var tasks = params && params.tasks || null;
    var start = params && params.start || false;
    var fn = params && params.fn || null;

    return function () {
        if (start) {
            if (tasks) {
                gulp.start.apply(gulp, tasks);
            }

            if (fn) {
                fn.call(null, null, null);
            }
        }

        var watcher = gulp.watch(src, {errLogToConsole: true}, function (event) {
            if (tasks && ~types.indexOf(event.type)) {
                gulp.start.apply(gulp, tasks);
            }

            if (fn) {
                fn.call(null, event.type, event.path);
            }
        });
    };
};

module.exports = watchTask;
