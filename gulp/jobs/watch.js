var gulp = require("gulp");
var run = require("run-sequence");
var _ = require("lodash");

var conf = _.get(require("./../../gulpconfig.js"), "watch", {});

function watchTask(src, opts) {
    opts = _.extend(_.extend({}, conf), opts);

    var types = opts && opts.types || ["added", "changed", "deleted"];
    var tasks = opts && opts.tasks || null;
    var start = opts && opts.start || true;

    return function () {
        var watcher = gulp.watch(src, opts, function (event) {
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
