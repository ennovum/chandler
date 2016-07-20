const gulp = require('gulp');
const gutil = require('gulp-util');
const through = require('through2');
const eslint = require('eslint');
const _ = require('lodash');

const conf = _.get(require('./../../gulpconfig.js'), 'eslint', {});

function eslintPlugin(opts) {
    opts = _.extend({
        logTag: gutil.colors.gray('[eslint]')
    }, conf, opts);

    return through.obj((file, enc, done) => {
        const cli = new eslint.CLIEngine();
        const formatter = cli.getFormatter('compact');
        const report = cli.executeOnFiles([file.path]);

        if (report.errorCount) {
            console.log(opts.logTag + '\n\n' + formatter(report.results) + '\n');
        }
        
        done(null, report);
    });
};

module.exports = eslintPlugin;
