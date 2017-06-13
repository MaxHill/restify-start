const TodoController = require('../controllers/todo');

app.get('/', function(request, response, next) {
    response.send('OK');
    next();
});

/**
 * Todo resource
 */
app.post('/todos', TodoController.post);
app.get('/todos', TodoController.list);
app.get('/todos/:todo_id', TodoController.get);
app.put('/todos/:todo_id', TodoController.update);
app.del('/todos/:todo_id', TodoController.delete);
