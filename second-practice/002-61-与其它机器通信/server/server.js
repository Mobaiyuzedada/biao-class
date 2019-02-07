const express = require('express');
const router = express.Router();
const any = require('../models/models');

router.post('/api/post', async (req, res) => {
    console.log(req.body);
    any.create(req.body, (err, data) => {
        if (err) throw err;
        console.log(data);
        console.log('创建成功');
        res.send({ status: 'ok', id: data._id });
    })
})
router.get('/api/findAll', async (req, res) => {
    any.find({})
        .sort({ '_id': 'desc' })
        .then(data => {
            res.send({ status: 'ok', data: data })
        }).catch(err => {
            res.json(err);
        })
})

// router.get('/api/find/by-string/:string', async (req, res) => {
//     let str = req.params.string;
//     console.log(str);
//     any.find({ $text: { $search: 'ss' } })
//         .then(data => {
//             res.send({ status: 'ok', data: data })
//         })
// })
module.exports = router;