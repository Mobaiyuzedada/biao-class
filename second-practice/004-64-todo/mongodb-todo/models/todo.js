var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    content: String,
    dateTime: String,
    completed: Boolean,
})
var todo = mongoose.model('todo', todoSchema, 'todos');

module.exports = todo;