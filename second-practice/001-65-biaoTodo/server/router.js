const express = require('express');
const router = express.Router();
const todo = require('../models/todo');

router.get('/fetchAll', (req, res) => {
    todo.find({}).sort({ _id: 'desc' }).then(data => {
        res.send({ status: 'ok', todos: data });
    }).catch(err => {
        res.json(err);
    })
})

router.put('/create', (req, res) => {
    console.log(req.body);
    todo.create(req.body, (err, data) => {
        if (err) throw err;
        console.log(data);
        console.log('创建数据成功');
        res.send({ status: 'ok', id: data._id })
    })
})

router.post('/update/:id', (req, res) => {
    todo.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).then(data => {
        res.send({ status: 'ok' })
    }).catch(err => {
        res.json(err);
    })
})
router.delete('/delete/:id', (req, res) => {
    todo.findOneAndRemove({ _id: req.params.id })
        .then(data => {
            res.send({ status: 'ok' })
        }).catch(err => { res.json(err) })
})
router.get('/fetch/:id', (req, res) => {
    todo.findById(req.params.id).then(data => {
        res.send({ status: 'ok', todo: data });
    }).catch(err => res.json(err))
})

module.exports = router;