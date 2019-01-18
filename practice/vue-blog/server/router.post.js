const express = require('express');
const router = express.Router();
const post = require('../models/db.post');

//创建新文章接口
router.put('/createPost', async(req, res) => {
    post.create(req.body, (err, data) => {
        if (err) throw err;
        console.log(data);
        console.log('创建数据成功');
        res.send({status:'ok',id:data._id});//传回给前端的信息
    })
})
//根据id更新文章
router.post('/updatePost/by-id/:id', (req, res) => {
    post.findOneAndUpdate(
        { _id: req.params.id },//查询条件
        { $set: req.body },//更新数据
        { new: true }
    ).then(data => {
        // res.json(data);
        res.send({status:'ok'});//传回给前端的信息
        console.log(data);
        console.log('更新成功');
    }).catch(err => {
        res.json(err);
    })
})
//根据id删除文章
router.delete('/deletePost/by-id/:id', (req, res) => {
    post.findOneAndRemove({ _id: req.params.id })
        .then(data => {
            // res.json(data);
            res.send({status:'ok'});//传回给前端的信息
        }).catch(err => {
            res.json(err);
        })
})
//获取文章列表
router.get('/getAllPost', (req, res) => {
    post.find({})
        .sort({'_id':'desc'})//按id降序来排
        .then(data => {
            // res.json(data);
            res.send({status:'ok',posts:data});//传回给前端的信息
        }).catch(err => {
            res.json(err);
        })
})
//根据id查询文章
router.get('/findPost/by-id/:id', (req, res) => {
    console.log(req.params);
    post.findById(req.params.id)
        .then(post => {
            // res.json(data);
            res.send({status:'ok',post});//传回给前端的信息
        }).catch(err => {
            res.json(err);
        })
})
module.exports = router;