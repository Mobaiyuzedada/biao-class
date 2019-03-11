const mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    title: {
        type: String,
        required: true,
    },
    content: String,
    cat_id: String,
}, {
        timestamps: {
            createdAt: 'dateTime'
        }
    })

module.exports = mongoose.model('posts', postSchema, 'posts');