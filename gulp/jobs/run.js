const gulp = require('gulp');
const run = require('run-sequence');
const _ = require('lodash');

function runJob() {
    const sequence = Array.prototype.slice.call(arguments);
    const ready;

    if (_.isFunction(_.last(sequence))) {
        ready = sequence.pop();
    }

    return (callback) => {
        run.apply(null, _.clone(sequence, true).concat(function (info) {
            if (ready) {
                ready(info);
            }

            if (callback) {
                callback(info);
            }
        }));
    };
}

module.exports = runJob;

