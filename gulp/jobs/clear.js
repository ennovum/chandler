const gulp = require('gulp');
const del = require('del');
const _ = require('lodash');

function clearJob() {
    const paths = Array.prototype.slice.call(arguments);

    return (callback) => {
        del(paths).then(() => callback());
    };
}

module.exports = clearJob;

