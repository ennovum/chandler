const process = require('process');

const buildName = process.env.npm_package_config_build;
const build = require('./build/' + buildName + '.js');

module.exports = build;
