const express = require('express');
const router = express.Router();
const post = require('../models/post');

router.put('/post/new', (req, res) => {
    console.log(req.body);
    post.create(req.body).then(post => {
        res.send({ status: 'ok', id: post._id })
    }).catch(err => res.send(err));
})
router.get('/post/fetchAll', (req, res) => {
    post.find({}).sort({'dateTime': 'desc'})
        .then(posts => {
            res.send({ status: 'ok', posts, })
        }).catch(err => res.send(err))
})
module.exports = router;