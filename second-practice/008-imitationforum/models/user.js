const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: String,    //姓名
    user_name: {    //用户名
        type: String,
        required: true,
        unique: true    //是否唯一
    },
    password: {     //密码
        type: String,
        required: true,
    },
    gender: String,
    info: String,
    github_id: String,
    admin: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: {
            createdAt: 'createTime'
        }
    })
module.exports = mongoose.model('users', userSchema, 'users');