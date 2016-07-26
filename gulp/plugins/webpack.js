const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const path = require('path');
const webpack = require('webpack-stream');

const buildconf = _.get(require('./../../buildconf.js'), 'webpack', {});

function webpackPlugin(opts) {
    opts = _.merge({
        target: 'web',
        logTag: gutil.colors.gray('[webpack]')
    }, buildconf, opts);

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
