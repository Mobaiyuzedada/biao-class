const express = require('express');
const router = express.Router();
const reply = require('../models/reply.schema');

router.put('/createReply', (req, res) => {
    reply.create(req.body)
        .then(reply => {
            res.send({ status: 'ok', id: reply._id })
        }).catch(err => {
            res.send(err);
        })
})
router.get('/fetchReply/by-post_id/:id', (req, res) => {
    reply.find({ "post_id": req.params.id })
        .then(replies => {
            res.send({ status: 'ok', replies })
        })
})
// router.get('/getReply/by-id/:id')
module.exports = router