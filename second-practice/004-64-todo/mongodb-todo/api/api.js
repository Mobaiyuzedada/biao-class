const $ = axios;


function createTodo(todo) {
    return new Promise((resolve, reject) => {
        $.put('http://localhost:3005/createTodo', todo)
            .then(mes => resolve(mes.data))
            .catch(err => reject(err));
    })
}
function updateTodoById(todo) {
    return new Promise((resolve, reject) => {
        $.post(`http://localhost:3005/update/by-id/${todo.id}`, todo)
            .then(mes => resolve(mes.data))
            .catch(err => reject(err));
    })
}
function deleteTodoById(id) {
    return new Promise((resolve, reject) => {
        $.delete(`http://localhost:3005/delete/by-id/${id}`)
            .then(mes => resolve(mes.data))
            .catch(err => reject(err));
    })
}
function fetchAll() {
    return new Promise((resolve, reject) => {
        $.get('http://localhost:3005/findAll')
            .then(mes => resolve(mes.data))
            .catch(err => reject(err));
    })
}