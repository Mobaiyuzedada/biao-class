const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    title: String,
    content: String,
})

module.exports = mongoose.model('Post', postsSchema);