; (function () {
    'use strict';




    let form = document.getElementById('todo-form');
    let input = form.querySelector('[name=title]');
    let list = document.querySelector('#todo-list');
    let $list;
    let currentId = null;

    // console.log($list );

    boot();

    function boot() {
        read();
        bindEvents();

    }



    /**
    * 读取所有数据,并取到所有数据
    */
    function read() {
        api('todo/read', null, res => {
            $list = res.data;
            console.log($list);
            render();
        });
    }
    function render() {
        list.innerHTML = '';
        $list && $list.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('todo-item');
            item.innerHTML = `
            <div class="checkbox">
                <input class='completed' type="checkbox" ${it.completed ? 'checked' : ''}>
            </div>
            <div class="title">
                ${it.title}
            </div>
            <div class="opera">
                <button class='update'>更新</button>
                <button class='del'>删除</button>
            </div>
            `
            list.appendChild(item);
            let checkbox = item.querySelector('.completed');
            checkbox.addEventListener('change', $ => {
                setCompleted(it.id, checkbox.checked);
            })

            let opts = item.querySelector('.opera');
            opts.addEventListener('click', e => {
                let et = e.target;
                et.classList.contains('del') ? del(it.id) : console.log("error");
                if (et.classList.contains('update')) {
                    currentId = it.id;
                    input.value = it.title;
                    console.log(currentId);
                }
            })

        })
    }
    function setCompleted(id, completed) {
        // api('todo/update',{id:id,completed:completed});
        api('todo/update', { id, completed }, res => {
            read();
        });
    }

    /*
    |-------------------------------------------------------
    | 增、删、查、改
    |-------------------------------------------------------
    | description
    */
    /**
     * 增
     * @Object row:要创建的数据
     */
    function create(row) {
        api('todo/create', row, res => {
            if (res.success) {
                read();
                form.reset();
            }
        });
        // form.reset();
    }
    function del(id) {
        api('todo/delete', { id }, res => {
            res.success && read();
            console.log(res);
        })
    }
    // function search(row){
    //     api('todo/find')
    // }
    function update(id, row) {
        api('todo/update', { id,...row }, res => {
            if (res.success) {
                read();
                form.reset();
            }
        })
    }


    /*
    |-------------------------------------------------------
    | 绑定事件
    |-------------------------------------------------------
    | description
    */
    function bindEvents() {
        form.addEventListener('submit', e => {
            e.preventDefault();

            let val = input.value;

            if (currentId) {
                update(currentId, {title:val});
                currentId=null;
                console.log( currentId);
            }
            else
                create();
        })
    }

})();


