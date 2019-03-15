import $ from 'axios';

function createPost(post) {
    return new Promise((resolve, reject) => {
        $.put('/api/post/new', post).then(r => {
            resolve(r.data);
        }).catch(err => reject(err))
    })
}
function fetchAll() {
    return new Promise((resolve, reject) => {
        $.get('/api/post/fetchAll').then(r => {
            resolve(r.data);
        }).catch(e => reject(e));
    })
}
function updatePostById(post) {
    return new Promise((resolve, reject) => {
        $.post(`/api/post/update/by-id/${post.id}`, post.newPost)
            .then(r => {
                resolve(r.data);
            }).catch(e => {
                reject(e);
            })
    })
}
function deletePostById(id) {
    return new Promise((resolve, reject) => {
        $.delete(`/api/post/delete/by-id/${id}`)
            .then(r => {
                resolve(r.data);
            }).catch(e => {
                reject(e);
            })
    })
}
export default {
    createPost,
    fetchAll,
    deletePostById,
    updatePostById
}