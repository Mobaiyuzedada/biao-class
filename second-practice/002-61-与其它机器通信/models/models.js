const mongoose = require('mongoose');


const schema = mongoose.Schema({
    any: String,
})

let Post = mongoose.model('Any', schema, 'Any');

module.exports = Post;