const gulp = require('gulp');
const gutil = require('gulp-util');
const through = require('through2');
const eslint = require('eslint');
const _ = require('lodash');

const buildconf = _.get(require('./../../build.js'), 'eslint', {});

function eslintPlugin(opts) {
    opts = _.merge({
        logTag: gutil.colors.gray('[eslint]')
    }, buildconf, opts);

    return through.obj((file, enc, done) => {
        const cli = new eslint.CLIEngine();
        const formatter = cli.getFormatter('compact');
        const report = cli.executeOnFiles([file.path]);

        if (report.errorCount) {
            gutil.log(opts.logTag, '\n' + formatter(report.results) + '\n');
        }
        
        done(null, report);
    });
};

module.exports = eslintPlugin;
