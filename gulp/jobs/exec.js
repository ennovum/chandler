const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const chprocess = require('child_process');

const conf = _.get(require('./../../gulpconfig.js'), 'exec', {});

function execJob(command, args, opts) {
    opts = _.extend({
        logTag: gutil.colors.gray('[exec]'),
        onLog: (data) => execLog(data, opts),
        onError: (data) => execErrorLog(data, opts),
        onExit: (code) => execExit(code, opts)
    }, conf, opts);

    return () => {
        const proc = chprocess.spawn(command, args);

        proc.stdout.on('data', opts.onLog);
        proc.stderr.on('data', opts.onError);
        proc.on('exit', opts.onExit);
    };
};

function execLog(data, opts) {
    lines = data.toString().split(/\r?\n/);
    _.forEach(lines, (line) => {
        gutil.log(opts.logTag, line);
    });
}

function execErrorLog(data, opts) {
    gutil.beep();
    lines = data.toString().split(/\r?\n/);
    _.forEach(lines, (line) => {
        gutil.log(opts.logTag, gutil.colors.red(line));
    });
}

function execExit(code, opts) {
    gutil.log(opts.logTag, 'exit (' + code + ')');
}

module.exports = execJob;
