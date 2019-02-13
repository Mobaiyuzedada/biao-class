const express = require('express');
const router = express.Router();
const todo = require('../models/todo');

//增
router.put('/createTodo', (req, res) => {
    todo.create(req.body, (err, data) => {
        if (err) throw err;
        console.log('创建数据成功');
        res.send({ status: 'ok', id: data._id });
    })
})
//删
router.delete('/delete/by-id/:id', (req, res) => {
    todo.findOneAndRemove({ _id: req.params.id })
        .then(data => {
            res.send({ status: 'ok' })
        }).catch(err => res.json(err));
})
//改
router.post('/update/by-id/:id', (req, res) => {
    todo.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).then(data => {
        res.send({ status: 'ok', });
    }).catch(err => res.json(err));
})
//查
router.get('/findAll', (req, res) => {
    todo.find({}).sort({ _id: -1 })
        .then(data => {
            res.send({ status: 'ok', todos: data })
        })
})
// router.post('/fetch/by-content/:content', (req, res) => {
//     todo.find({ content: req.params.content })
// })

module.exports = router;