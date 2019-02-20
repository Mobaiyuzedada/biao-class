const $ = require('axios');

function createPost(post) {
    return new Promise((resolve, reject) => {
        $.put('/api/createPost', post)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}
function deletePostById(id) {
    return new Promise((resolve, reject) => {
        $.delete(`/api/deletePost/by-id/${id}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}
function updatePostById(params) {
    return new Promise((resolve, reject) => {
        $.post(`/api/updatePost/by-id/${params.id}`, params.post)
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}
function fetchPostById(id) {
    return new Promise((resolve, reject) => {
        $.get(`/api/fetchPost/by-id/${id}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}
function fetchAll() {
    return new Promise((resolve, reject) => {
        $.get('/api/fetchAll')
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })
}

// module.exports = {
//     createPost,
//     updatePostById,
//     deletePostById,
//     fetchAll,
//     fetchPostById
// }
export default {
    createPost,
    updatePostById,
    deletePostById,
    fetchAll,
    fetchPostById
}