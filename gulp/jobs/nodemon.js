const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const nodemon = require('nodemon');

const conf = _.get(require('./../../gulpconfig.js'), 'nodemon', {});

function nodemonJob(file, opts) {
    opts = _.extend({
        logTag: gutil.colors.gray('[nodemon]'),
        onStart: nodemonStart,
        onQuit: nodemonQuit,
        onRestart: nodemonRestart
    }, conf, opts);

    function nodemonStart() {
        gutil.log(opts.logTag, 'start');
    }

    function nodemonQuit() {
        gutil.log(opts.logTag, 'quit');
    }

    function nodemonRestart(files) {
        gutil.log(opts.logTag, 'restart');
    }

    return () => {
        nodemon({
            script: file
        });

        nodemon
            .on('start', opts.onStart)
            .on('quit', opts.onQuit)
            .on('restart', opts.onRestart);
    };
};

module.exports = nodemonJob;
