var gulp = require("gulp");
var gutil = require("gulp-util");
var _ = require("lodash");
var nodemon = require("nodemon");

var conf = _.get(require("./../../gulpconfig.js"), "nodemon", {});

function nodemonJob(file, opts) {
    opts = _.extend(_.extend({
        logTag: gutil.colors.gray("[nodemon]"),
        onStart: nodemonStart,
        onQuit: nodemonQuit,
        onRestart: nodemonRestart
    }, conf), opts);

    function nodemonStart() {
        gutil.log(opts.logTag, "start");
    }

    function nodemonQuit() {
        gutil.log(opts.logTag, "quit");
    }

    function nodemonRestart(files) {
        gutil.log(opts.logTag, "restart");
    }

    return function nodemonTask() {
        nodemon({
            script: file
        });

        nodemon
            .on("start", opts.onStart)
            .on("quit", opts.onQuit)
            .on("restart", opts.onRestart);
    };
};

module.exports = nodemonJob;
