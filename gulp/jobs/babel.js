const gulp = require('gulp');
const _ = require('lodash');
const babel = require('gulp-babel');

const conf = _.get(require('./../../gulpconfig.js'), 'babel', {});

function babelJob(src, dest, opts) {
    opts = _.extend({}, conf, opts);

    return () => gulp.src(src)
        .pipe(babel(opts))
        .pipe(gulp.dest(dest));
};

module.exports = babelJob;
