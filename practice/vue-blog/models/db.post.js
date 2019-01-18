const mongoose = require('mongoose');

const postSchema = mongoose.Schema({//创建数据模型
    title: String,
    content: String,
});

var Post = mongoose.model('Post', postSchema, 'posts');//应用上面的模型

module.exports = Post;