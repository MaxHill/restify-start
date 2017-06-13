const _ = require('lodash');
let config = require('./config');
let configOverride = {};

if (process.env.NODE_ENV == 'development') {
    configOverride = require('./config-dev');
}

if (process.env.NODE_ENV == 'testing') {
    configOverride = require('./config-test');
}


module.exports = _.extend(config, configOverride);
