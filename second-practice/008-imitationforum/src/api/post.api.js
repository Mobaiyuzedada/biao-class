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
export default {
    createPost,
    fetchAll
}