var gulp = require("gulp");
var gutil = require("gulp-util");
var _ = require("lodash");
var chprocess = require("child_process");

var conf = _.get(require("./../../gulpconfig.js"), 'exec', {});

function execJob(command, args, opts) {
    opts = _.extend(_.extend({
        logTag: gutil.colors.gray("[exec]"),
        onLog: execLog,
        onError: execErrorLog,
        onExit: execExit
    }, conf), opts);

    function execLog(data) {
        lines = data.toString().split(/\r?\n/);
        _.forEach(lines, function (line) {
            gutil.log(opts.logTag, line);
        });
    }

    function execErrorLog(data) {
        gutil.beep();
        lines = data.toString().split(/\r?\n/);
        _.forEach(lines, function (line) {
            gutil.log(opts.logTag, gutil.colors.red(line));
        });
    }

    function execExit(code) {
        gutil.log(opts.logTag, "exit (" + code + ")");
    }

    return function execTask() {
        var proc = chprocess.spawn(command, args);

        proc.stdout.on("data", opts.onLog);
        proc.stderr.on("data", opts.onError);
        proc.on("exit", opts.onExit);
    };
};

module.exports = execJob;
