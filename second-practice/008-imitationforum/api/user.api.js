const $ = require('axios');


function createUser(user) {
    return new Promise((resolve, reject) => {
        $.put('http://localhost:3008/createUser', user)
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                let errmsg = err.response.data;
                reject(errmsg);
            })
    })
}
function getUser(user) {
    return new Promise((resolve, reject) => {
        $.post('http://localhost:3008/findUser', user)
            .then(res => {
                // console.log(res.data);
                if (res.data.user.length == 1 && res.data.status == 'ok')
                    return resolve({ status: 'ok', user: { id: res.data.user[0]._id, username: user.user_name } })
                // else return Promise.reject({ status: 'error', })
                else return resolve({ status: 'error', });
            }).catch(err => reject(err))
    })
}
function getUserById(id) {
    return new Promise((resolve, reject) => {
        $.post(`http://localhost:3008/getUser/by-id/${id}`)
            .then(res => {
                resolve(res.data);
            })
    })
}

export default {
    createUser,
    getUser,
    getUserById
}