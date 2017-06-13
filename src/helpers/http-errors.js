const errors = require('restify-errors');

module.exports = {
    internalError(next, error) {
        log.error(error);
        return next(new errors.InternalError(error.errors.name.message));
    },
    invalidContent(error) {
        log.error(error);
        return next(new errors.InvalidContentError(error.errors.name.message));
    },
    resourceNotFound(error) {
        log.error(error);
        return next(new errors.ResourceNotFoundError(error));
    },
};
