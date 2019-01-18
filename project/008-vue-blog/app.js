const express = require('express');
const app = express();
const bp = require('body-parser');
const mongoose = require('mongoose');

const json = bp.json();
const ulp = bp.urlencoded();

app.use(json);
app.use(ulp);

const postsSchema = mongoose.Schema({
    title: String,
    content: String,
})


mongoose.connect('mongodb://localhost/test_Blog');
var post = mongoose.model('test', postsSchema, 'posts');

app.post('/api/post', (req, res) => {
    post.create(req.body, (err, data) => {
        if (err) throw err;
        console.log(data);
        console.log('创建数据成功');
        res.json(data);
    })
})
app.get('/api/read', (req, res) => {
    post.find({})
        .sort({ update_at: -1 })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
})

app.get('/api/read/:id', (req, res) => {
    post.findById(req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
})
app.post('/api/update/:id', (req, res) => {
    post.findOneAndUpdate(
        { _id: req.params.id },//查询条件
        { $set: req.body },//更新数据
        { new: true }//
    ).then(data => { res.json(data); console.log(data); }).catch(err => res.json(err));
})
app.post('/api/delete/:id', (req, res) => {
    post.findOneAndRemove({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(err => res.json(err));
})

app.listen(3001, () => {
    console.log('listened 3000');
})