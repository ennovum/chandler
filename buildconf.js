const process = require('process');

const buildName = process.env.npm_package_config_build;
const buildconf = require('./build/' + buildName + '.js');

module.exports = buildconf;
