const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const map = require('map-stream');
const path = require('path');
const webpack = require('webpack');

const conf = _.get(require('./../../gulpconfig.js'), 'nodepack', {});

function nodepackJob(src, dest, opts) {
    opts = _.extend({
        logTag: gutil.colors.gray('[nodepack]')
    }, conf, opts);

    return () => gulp.src(src)
        .pipe(map(function (file, done) {
            webpack(
                _.extend({
                    entry: [file.path],
                    output: {
                        path: dest,
                        filename: path.basename(file.path)
                    }
                }, opts),
                function (err, stats) {
                    gutil.log(opts.logTag, '\n' + stats.toString({
                        colors: true,
                        hash: false,
                        version: false,
                        timings: false,
                        assets: false,
                        chunks: false,
                        chunkModules: false,
                        modules: true,
                        cached: false,
                        reasons: false,
                        source: true,
                        errorDetails: true,
                        chunkOrigins: true
                    }));

                    done(err);
                });
        }));
};

module.exports = nodepackJob;
