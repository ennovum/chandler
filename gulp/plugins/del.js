const gulp = require('gulp');
const through = require('through2');
const del = require('del');
const _ = require('lodash');

const conf = _.get(require('./../../buildconfig.js'), 'del', {});

function delPlugin(opts) {
    opts = _.extend({}, conf, opts);

    return through.obj((file, enc, done) => {
        del(file.path);
        done();
    });
};

module.exports = delPlugin;
