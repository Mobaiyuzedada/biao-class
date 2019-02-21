const mongoose = require('mongoose');

let replySchema = mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reply_to: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    github_id: String,
    email: String,
    content: {
        type: String,
        required: true
    }
}, {
        timestamps: {
            createdAt: 'date',
        }
    })

let reply = mongoose.model('reply', replySchema, 'replies');
module.exports = reply;