// import $ from 'axios';
var $ = require('axios');
/*
|-------------------------------------------------------
| 后端提供的接口
|-------------------------------------------------------
| description
|           创建文章：    '/createPost'       put
|           更新文章：    '/updatePost/by-id/:id'  (根据文章id)
|           删除文章：    '/deletePost/by-id/:id'  (根据文章id) delte
|           获取文章列表： '/getAllPost'
|           获取单篇文章： '/findPost/by-id/:id'
*/


// $.put('http://localhost:3000/createPost', params).then(r => {
//     console.log(r.data);
//     if (r.status === 200)
//         alert('创建成功');
// }).catch(err => {
//     console.error(err);
// })
//创建文章
function createPost(params) {
    return new Promise((resolve, reject) => {
        $.put('/api/createPost', params)
            .then(res => { resolve(res.data) })
            .catch(err => { reject(err) })
    })
}
//根据id更新
function updatePost(params) {
    return new Promise((resolve, reject) => {
        $.post(`/api/updatePost/by-id/${params.id}`, params.post)
            .then(res => { resolve(res) })
            .catch(err => { reject(err) })
    })
}
//根据id删除
function deletePost(params) {
    return new Promise((resolve, reject) => {
        $.delete(`/api/deletePost/by-id/${params.id}`)
            .then(res => { resolve(res.data) })
            .catch(err => { reject(err) })
    })
}
//根据id获取
function getPostById(params) {
    return new Promise((resolve, reject) => {
        $.get(`/api/findPost/by-id/${params.id}`)
            .then(res => { resolve(res.data.post) })//后端返回的信息res.send({status:'ok',post});
            .catch(err => reject(err))
    })
}
//获取所有
function getAllPost(params = {}) {
    return new Promise((resolve, reject) => {
        $.get('/api/getAllPost')
            .then(res => {
                resolve(res.data.posts);//后端返回的内容为res.send({status:'ok',posts:data});
            })
            .catch(err => reject(err));
    });
}
export default {
    createPost,
    updatePost,
    deletePost,
    getPostById,
    getAllPost
}