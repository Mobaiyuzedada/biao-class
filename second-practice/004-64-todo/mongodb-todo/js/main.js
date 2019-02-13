
; (function () {
    'use strict';


    let form = document.querySelector('#todo-form');
    let input = form.querySelector('[name=content]');
    let todoList = document.querySelector('.todo-list');
    let str = todoList.innerHTML;
    let has = true;

    start();

    function start() {
        fetchAllTodo();
        bindSubmit();
    }
    function fetchAllTodo() {
        fetchAll().then(res => {
            if (res.status == 'ok') {
                let todos = res.todos;
                render(todos);
            }
        })
    }
    function bindSubmit() {
        form.addEventListener('submit', e => {
            e.preventDefault();

            let val = input.value;
            if (!val) {
                console.log('没有输入内容');
                return;
            }
            let time = getDate();
            let completed = false;
            let todoData = {
                content: val,
                dateTime: time,
                completed,
            }
            createTodo(todoData).then(res => {
                if (res.status == 'ok') {
                    alert('待办事项已添加');
                    form.reset();
                    fetchAllTodo();
                }
            })
        })
    }

    function render(todos) {
        todoList.innerHTML = str;
        todos.forEach(todo => {
            let todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            todoItem.innerHTML = `
                    <div class="checkbox">
                        <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled=true>
                    </div>
                    <div class="content">
                        <span>${todo.content}</span>
                    </div>
                    <div class="create-time">
                        <span>${todo.dateTime}</span>
                    </div>
                    <div class="operations">
                        <button>更新</button>
                        <button>删除</button>
                    </div>
            `
            let operations = todoItem.querySelector('.operations');
            operations.addEventListener('click', e => {
                let et = e.target;
                if (et.innerHTML == '更新') {
                    if (!has)
                        return;
                    has = false;
                    updateTodo(todo, todoItem);
                }
                if (et.innerHTML == '删除') {
                    deleteTodo(todo._id);
                }
            })
            todoList.appendChild(todoItem);
        })
    }
    function updateTodo(todo, dom) {
        let checkbox = dom.querySelector('.checkbox').querySelector('input');
        checkbox.disabled = false;
        let content = dom.querySelector('.content');
        content.innerHTML = `
            <input type="text" value=${todo.content}>
        `
        dom.addEventListener('keyup', e => {
            if (e.key == 'Enter') {
                let time = getDate();
                let newVal = content.querySelector('input').value;
                let completed = checkbox.checked;
                todo = { id: todo._id, content: newVal, dateTime: time, completed };
                updateTodoById(todo).then(res => {
                    if (res.status == 'ok') {
                        alert('待办事项更新成功');
                        fetchAllTodo();
                        has = true;
                    }
                })
            }
        })
    }
    function deleteTodo(id) {
        if (!confirm('此操作不可撤销')) {
            return;
        }
        deleteTodoById(id).then(res => {
            if (res.status == 'ok') {
                alert('删除成功');
                fetchAllTodo();
            }
        })
    }
    function getDate() {
        var myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let day = myDate.getDate();
        let time = myDate.toLocaleTimeString('chinese', { hour12: false });
        let str = month + '/' + day + ', ' + time;
        return str;
    }
})();