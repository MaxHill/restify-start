let Todo = require('../models/todo');

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

chai.should();
chai.use(chaiHttp);

// Our parent block
describe('todos', () => {
    beforeEach((done) => { // Before each test we empty the database
        Todo.remove({}, (err) => {
            done();
        });
    });

    it('should be able to get all todos', (done) => {
        let todo = new Todo({
            task: 'Test the api',
            status: 'pending',
        });

        todo.save((err, todo) => {
            chai.request(server)
                .get('/todos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body[0].task.should.be.eql(todo.task);
                    done();
                });
        });
    });

    it('should be able to add a task', (done) => {
        let task = {
            task: 'Walk the dog - testing',
            status: 'pending',
        };

        chai.request(server)
            .post('/todos')
            .send(task)
            .end((err, res) => {
                res.should.have.status(201);

                Todo.find({}, function(err, todos) {
                    todos.length.should.be.eql(1);
                    done();
                });
            });
    });
});
