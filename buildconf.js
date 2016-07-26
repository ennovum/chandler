const process = require('process');

const confName = process.env.npm_package_config_conf;
const buildconf = require('./conf/build/' + confName + '.js');

module.exports = buildconf;
