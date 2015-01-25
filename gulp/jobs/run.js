var gulp = require("gulp");
var run = require("run-sequence");
var _ = require("lodash");

function runJob() {
    var sequence = Array.prototype.slice.call(arguments);
    var ready;

    if (typeof sequence[sequence.length - 1] === "function") {
        ready = sequence.pop();
    }

    return function (callback) {
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

