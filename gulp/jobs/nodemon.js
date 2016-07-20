const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const nodemon = require('nodemon');

const conf = _.get(require('./../../gulpconfig.js'), 'nodemon', {});

function nodemonJob(file, opts) {
    opts = _.extend({
        logTag: gutil.colors.gray('[nodemon]'),
        onStart: () => nodemonStart(opts),
        onQuit: () => nodemonQuit(opts),
        onRestart: (files) => nodemonRestart(files, opts)
    }, conf, opts);

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

function nodemonStart(opts) {
    gutil.log(opts.logTag, 'start');
}

function nodemonQuit(opts) {
    gutil.log(opts.logTag, 'quit');
}

function nodemonRestart(files, opts) {
    gutil.log(opts.logTag, 'restart');
}

module.exports = nodemonJob;
