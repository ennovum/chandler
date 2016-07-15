const gulp = require('gulp');
const eslint = require('gulp-eslint');
const _ = require('lodash');

const conf = _.get(require('./../../gulpconfig.js'), 'eslint', {});

function eslintJob(src, opts) {
    opts = _.extend({}, conf, opts);

    return () => gulp.src(src)
        .pipe(eslint(opts))
        .pipe(eslint.format());
};

module.exports = eslintJob;
