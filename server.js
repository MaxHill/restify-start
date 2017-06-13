const config = require('./config');
const restify = require('restify');
const winston = require('winston');
const bunyanWinston = require('bunyan-winston-adapter');
const mongoose = require('mongoose');
const eslintRun = require('./eslint-run');
mongoose.Promise = global.Promise;

/**
 * Logging
 */
global.log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            timestamp: () => {
                return new Date().toString();
            },
            json: true,
        }),
    ],
});

/**
 * Lint the project
 */
if (config.env == 'development') {
    eslintRun();
}

/**
 * Initialize Server
 */
global.app = restify.createServer({
    name: config.name,
    version: config.version,
    log: bunyanWinston.createAdapter(log),
});

/**
 * Middleware
 */
app.use(restify.jsonBodyParser({mapParams: true}));
app.use(restify.acceptParser(app.acceptable));
app.use(restify.queryParser({mapParams: true}));
app.use(restify.fullResponse());

/**
 * Error Handling
 */
app.on('uncaughtException', (req, res, route, err) => {
    log.error(err.stack);
    res.send(err);
});

/**
 * Lift Server, Connect to DB & Bind Routes
 */
app.listen(config.port, function() {
    mongoose.connection.on('error', function(err) {
        log.error('Mongoose default connection error: ' + err);
        process.exit(1);
    });

    mongoose.connection.on('open', function(err) {
        if (err) {
            log.error('Mongoose default connection error: ' + err);
            process.exit(1);
        }

        // Remove noise from testing output
        if (config.env !== 'testing') {
            log.info(
                '%s v%s ready to accept connections ' +
                'on port %s in %s environment.',
                app.name,
                config.version,
                config.port,
                config.env
            );
        }

        require('./src/routes');
    });

    global.db = mongoose.connect(config.db.uri);
});

module.exports = app; // for testing
