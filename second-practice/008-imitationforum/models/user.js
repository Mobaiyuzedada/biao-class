const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: String,    //姓名
    user_name: {    //用户名
        type: String,
        required: true,
        unique: true
    },
    password: {     //密码
        type: String,
        required: true,
    },
    gender: String,
    info: String,
}, {
        timestamps: {
            createdAt: 'createTime'
        }
    })
module.exports = mongoose.model('users', userSchema, 'users');