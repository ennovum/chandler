const gulp = require('gulp');
const _ = require('lodash');
const mocha = require('gulp-mocha');

const conf = _.get(require('./../../gulpconfig.js'), 'mocha', {});

function mochaJob(src, opts) {
    opts = _.extend({}, conf, opts);

    return () => gulp.src(src)
        .pipe(mocha(opts));
};

module.exports = mochaJob;
