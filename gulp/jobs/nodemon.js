const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const fse = require('fs-extra');
const nodemon = require('nodemon');

const conf = _.get(require('./../../gulpconfig.js'), 'nodemon', {});

function nodemonJob(path, opts) {
    opts = _.extend({
        script: path,
        logTag: gutil.colors.gray('[nodemon]')
    }, conf, opts);

    return (callback) => {
        fse.ensureFileSync(path);
        nodemon(opts);

        nodemon
            .on('start', () => {
                nodemonStartLog(opts);
            })
            .on('quit', () => {
                nodemonQuitLog(opts);
            })
            .on('restart', (paths) => {
                nodemonRestartLog(paths, opts);
            });

        // if the job ends right away, nodemon may not get some instant changes :(
        setTimeout(callback, 1000);
    };
};

function nodemonStartLog(opts) {
    gutil.log(opts.logTag, 'start');
}

function nodemonQuitLog(opts) {
    gutil.log(opts.logTag, 'quit');
}

function nodemonRestartLog(paths, opts) {
    gutil.log(opts.logTag, 'restart');
}

module.exports = nodemonJob;
