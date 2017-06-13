const _ = require('lodash');
const config = require('./config');

// Config used for setting up test application.
// Extends base config and overrides relevant values.
module.exports = _.extend(
    config,
    {
        env: 'testing',
        port: 3333,
        base_url: 'http://localhost:3333',
        db: {
            uri: 'mongodb://127.0.0.1:27017/fit-testing',
        },
    }
);
