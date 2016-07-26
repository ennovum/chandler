const gulp = require('gulp');
const through = require('through2');
const del = require('del');
const _ = require('lodash');

const buildconf = _.get(require('./../../build.js'), 'del', {});

function delPlugin(opts) {
    opts = _.merge({}, buildconf, opts);

    return through.obj((file, enc, done) => {
        del(file.path);
        done();
    });
};

module.exports = delPlugin;
