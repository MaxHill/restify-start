const _ = require('lodash');
const Todo = require('../models/todo');
const error = require('../helpers/http-errors');

module.exports = {

    error,

    post(request, response, next) {
        let data = request.body || {};

        let todo = new Todo(data);
        todo.save((error) => {
            if (error) {
                return this.error.internalError(next, error);
            }

            response.send(201);
            next();
        });
    },

    list(request, response, next) {
        Todo.apiQuery(request.params, (error, docs) => {
            if (error) {
                return this.error.invalidContent(next, error);
            }

            response.send(docs);
            next();
        });
    },

    get(request, response, next) {
        Todo.findOne({_id: request.params.todo_id}, (error, doc) => {
            if (error) {
                return this.error.invalidContent(next, error);
            }

            response.send(doc);
            next();
        });
    },

    update(request, response, next) {
        let data = request.body || {};

        if (!data._id) {
            _.extend(data, {
                _id: request.params.todo_id,
            });
        }

        Todo.findOne({_id: request.params.todo_id}, (error, doc) => {
            if (error) {
                return this.error.invalidContent(next, error);
            } else if (!doc) {
                return this.error.resourceNotFound(
                    'The resource you requested could not be found.'
                );
            }

            Todo.update({_id: data._id}, data, (error) => {
                if (error) {
                    return this.error.invalidContent(next, error);
                }

                response.send(200, data);
                next();
            });
        });
    },

    delete(request, response, next) {
        Todo.remove({_id: request.params.todo_id}, (error) => {
            if (error) {
                return this.error.invalidContent(next, error);
            }

            response.send(204);
            next();
        });
    },
};
