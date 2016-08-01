const process = require('process');
const _ = require('lodash');

const buildName = _.get(process, 'env.npm_package_config_build', 'default');
const build = require('./build/' + buildName + '.js');

module.exports = build;
