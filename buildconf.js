const process = require('process');

const build = process.env.npm_package_config_build;
const buildconf = require('./conf/build/' + build + '.js');

module.exports = buildconf;
