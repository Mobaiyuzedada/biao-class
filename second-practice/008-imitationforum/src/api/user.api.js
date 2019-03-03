const $ = require('axios');


function createUser(user) {
    console.log(user);
    return new Promise((resolve, reject) => {
        $.put('/api/createUser', user)
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
        $.post('/api/findUser', user)
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
        $.post(`/api/getUser/by-id/${id}`)
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
    })
}
function updateUserById(newUser) {
    return new Promise((resolve, reject) => {
        $.post(`/api/updateUser/by-id/${newUser.id}`, newUser.user)
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
    })
}
export default {
    createUser,
    getUser,
    getUserById,
    updateUserById
}