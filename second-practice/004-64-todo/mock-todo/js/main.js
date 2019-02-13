; (function () {
    'use strict';
    let $ = api;
    let form = document.querySelector('#todo-form');
    let input = form.querySelector('[name=content]');
    let todoList = document.querySelector('.todo-list');
    let currentId;
    let str = todoList.innerHTML;
    let has = true;

    start();

    function start() {
        readTodoList();
        bindSubmit();
    }
    function readTodoList() {
        $.get('biao_todo/read?limit=50').then(res => {
            if (res.success == true) {
                let todos = res.data;
                render(todos);
            }
        })
    };
    function create(todoData) {
        $.post('biao_todo/create', todoData).then(res => {
            if (res.success == true) {
                alert('添加待办事项成功');
                readTodoList();
                form.reset();
            }
        })
    }
    function deleteTodo(todo) {
        if (!confirm('确定要删除此条待办事项吗？此操作不可恢复')) {
            return;
        }
        $.post('biao_todo/delete', { id: todo.id }).then(res => {
            if (res.success == true) {
                alert('删除待办事项成功');
                readTodoList();
            }
        })
    }
    function updateTodo(id, data) {
        $.post('biao_todo/update', { id, ...data }).then(res => {
            if (res.success == true) {
                alert('更新待办事项成功');
                readTodoList();
                has = true;
            }
        })
    }

    function bindSubmit() {
        form.addEventListener('submit', e => {
            e.preventDefault();

            let content = input.value;
            if (!content) {
                alert('输入不能为空');
                return;
            }
            let completed = true;
            let createDate = getDate();
            let todoData = { content, completed, dateTime: createDate };
            // if (currentId) {
            //     updateTodo(currentId, todoData);//这里的时间是最新时间
            //     currentId = null;
            // } else {
            create(todoData);
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
            <div class="title">
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
                if (et.innerHTML === '更新') {
                    if (!has) {//防止多次点击更新提交
                        console.log('done');
                        return;
                    }
                    has = false;
                    todoItem.querySelector('.checkbox').querySelector('input').disabled = false;
                    let content = todoItem.querySelector('.title');
                    content.innerHTML = `<input type=text value=${todo.content}>`;
                    todoItem.addEventListener('keyup', $e => {
                        if ($e.key == "Enter") {
                            let completed_val = todoItem.querySelector('.checkbox').querySelector('input[type=checkbox]').checked;
                            let newVal = content.querySelector('input').value;
                            let updateData = { completed: completed_val, content: newVal, dataTime: todo.dateTime };
                            updateTodo(todo.id, updateData);
                        };
                    })
                }
                if (et.innerHTML === '删除') {
                    console.log(todo);
                    deleteTodo(todo);
                }
            })
            todoList.appendChild(todoItem);
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