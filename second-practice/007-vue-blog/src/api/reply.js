import $ from 'axios';

function createReply(reply) {
    return new Promise((resolve, reject) => {
        $.put('/api/createReply', reply).then(res => resolve(res.data));
    })
}
function getReplies(id) {
    return new Promise((resolve, reject) => {
        $.get(`/api/fetchReply/by-post_id/${id}`)
            .then(res => resolve(res.data))
    })
}

export default {
    createReply,
    getReplies
}