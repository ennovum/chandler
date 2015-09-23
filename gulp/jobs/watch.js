var gulp = require("gulp");
var run = require("run-sequence");
var _ = require("lodash");

function watchTask(src, params) {
    var types = params && params.types || ["added", "changed", "deleted"];
    var tasks = params && params.tasks || null;
    var start = params && params.start || true;

    return function () {
        var watcher = gulp.watch(src, {errLogToConsole: true}, function (event) {
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
