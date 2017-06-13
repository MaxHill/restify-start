const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const createdModified = require('mongoose-createdmodified')
    .createdModifiedPlugin;

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'complete', 'overdue'],
        default: 'pending',
    },
}, {minimize: false});


TodoSchema.plugin(mongooseStringQuery);
TodoSchema.plugin(createdModified, {index: true});

const Todo = mongoose.model('Todo', TodoSchema );
module.exports = Todo;
