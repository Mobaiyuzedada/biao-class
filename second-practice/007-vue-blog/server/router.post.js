const express = require('express');
const router = express.Router();
const post = require('../models/post.schema');
// const { objectID } = require('mongodb');

router.put('/createPost', (req, res) => {
    console.log(req.body);
    post.create(req.body)
        .then(post => {
            res.send({ status: 'ok', id: post._id });
            console.log('创建数据成功');
        }).catch(err => {
            res.json(err);
        })
})
router.delete('/deletePost/by-id/:id', (req, res) => {
    post.findOneAndRemove({ _id: req.params.id })
        .then(post => {
            res.send({ status: 'ok', deleted_post: post })
        }).catch(err => {
            res.json(err);
        })
})
router.post('/updatePost/by-id/:id', (req, res) => {
    post.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).then(post => {
        res.send({ status: 'ok' });
    }).catch(err => {
        res.json(err);
    })
})
router.get('/fetchPost/by-id/:id', (req, res) => {
    post.findById({ _id: req.params.id })
        .then(post => {
            res.send({ status: 'ok', post })
        }).catch(err => {
            res.json(err);
        })
})
router.get('/fetchAll', (req, res) => {
    post.find({}).sort({ 'date': 'desc' })
        .then(posts => {
            res.send({ status: 'ok', posts });
        }).catch(err => {
            res.json(err);
        })
})

module.exports = router;