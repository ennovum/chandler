const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const path = require('path');
const webpack = require('webpack-stream');

const conf = _.get(require('./../../buildconfig.js'), 'webpack', {});

function webpackPlugin(opts) {
    opts = _.extend({
        target: 'web',
        logTag: gutil.colors.gray('[webpack]')
    }, conf, opts);

    return webpack(opts, null, (err, stats) => {
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
    });
};

module.exports = webpackPlugin;
