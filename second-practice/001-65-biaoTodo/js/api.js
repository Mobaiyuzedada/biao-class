var $ = axios;
function createTodo(params) {
    console.log(params);
    return new Promise((resolve, reject) => {
        $.put('http://localhost:3001/create', params)
            .then(res => {
                resolve(res.data);
            }).catch(e => {
                reject(e);
            })
    })
}
function fetchAllTodo() {
    return new Promise((resolve, reject) => {
        $.get('http://localhost:3001/fetchAll')
            .then(res => {
                resolve(res.data.todos);
            }).catch(e => {
                reject(err);
            })
    })
}

function deleteTodo(id) {
    return new Promise((resolve, reject) => {
        $.delete(`http://localhost:3001/delete/${id}`)
            .then(res => {
                resolve(res.data);
            }).catch(e => {
                reject(e);
            })
    })
}
function updateTodo(params) {
    console.log(params);
    return new Promise((resovle, reject) => {
        $.post(`http://localhost:3001/update/${params.id}`, params.content)
            .then(res => {
                resovle(res.data);
            }).catch(e => {
                reject(e);
            })
    })
}

function fetchTodo(id) {
    return new Promise((resolve, reject) => {
        $.get(`http://localhost:3001/fetch/${id}`)
            .then(res => {
                resolve(res.data);
            }).catch(e => reject(e));
    })
}
