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
    post.find({}).sort({ 'dateTime': 'desc' })
        .then(posts => {
            res.send({ status: 'ok', posts, })
        }).catch(err => res.send(err))
})
router.post('/post/update/by-id/:id', (req, res) => {
    post.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        .then(post => {
            res.send({ status: 'ok' })
                .catch(err => {
                    res.send(err);
                })
        })
})
router.delete('/post/delete/by-id/:id', (req, res) => {
    post.findOneAndRemove({ _id: req.params.id }).then(post => {
        res.send({ status: 'ok', deleted_post: post })
    }).catch(err => {
        res.send(err);
    })
})
module.exports = router;