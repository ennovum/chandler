const gulp = require('gulp');
const _ = require('lodash');
const through = require('through2');
const test = require('tape');
const faucet = require('faucet');

const buildconf = _.get(require('./../../build.js'), 'tape', {});

function tapePlugin(opts) {
    opts = _.merge({}, buildconf, opts);

    return through.obj((file, enc, done) => {
        const source = file.contents;
        const stream = test.createStream()
            .pipe(faucet())
            .pipe(process.stdout);
        
        (new Function('require', source))(require);

        done(null, stream);
    });
};

module.exports = tapePlugin;
