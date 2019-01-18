const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
var $ = require('axios');


function handle(url, data) {
    $(url, {
        method:'post',
    })
    router.post('/post/new', (req, res) => {
        Post.create(req.body, (err, post) => {
            if (err) {
                res.json(err);
            } else {
                res.json(post);
            }
        })
    })
}


module.exports = router;