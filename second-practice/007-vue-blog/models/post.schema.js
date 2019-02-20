const mongoose = require('mongoose');

var postsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        // required: true  //是否必须
    },
    date: {
        type: Date,
        default: new Date(),//默认值
    }
}, {
        timestamps: {
            createdAt: 'createAt',//创建时间mongoose自带
            updatedAt: 'updateAt'//更新时间
        }
    })

let post = mongoose.model('Post', postsSchema, 'posts')
module.exports = post;