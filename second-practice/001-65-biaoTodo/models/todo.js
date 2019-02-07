const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    content: String
})

var todo = mongoose.model('todo', todoSchema, 'todo');

module.exports = todo;