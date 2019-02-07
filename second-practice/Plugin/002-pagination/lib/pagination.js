/*
|-------------------------------------------------------
| 翻页插件
|-------------------------------------------------------
*/

; (function () {
    'use strict';
    //默认配置
    const Deafult_config = {
        limit: 11,
        current: 1,
    }


    window.pagination = {
        start, init
    }

    function start(custom) {
        // let config = Object.assign({}, Deafult_config, custom)
        let config = { ...Deafult_config, ...custom }//es6
        //存放所有的页面相关信息，由prepare准备
        let page = {};
        let state = {
            config,
            page,
        };
        prepare(state);
        init(state);
        bindEvents(state);
        return new Promise((resolve, reject) => {
            resolve(state);
        })
    }

    function prepare(state) {
        //创建元素
        let el = state.el = document.createElement('div');
        //插入位置
        let insert = state.insert = document.querySelector(state.config.el);
        //计算页数
        state.page.Max = Math.ceil(state.config.amount / state.config.limit);
        //显示的按钮的个数
        state.page.length = parseInt(state.config.limit);
        //当前页
        state.page.current = parseInt(state.config.current);
        el.classList.add('pagination');
        el.innerHTML = `<div>
            <span class='shortcuts'><a href="#">&laquo</a></span>
            <span class="primary-buttons">
            </span>
            <span class='shortcuts'><a href="#">&raquo</a></span>
            </div>
        `
        insert.appendChild(el);
        state.page.insert = el.querySelector('.primary-buttons');
        //缓存上一页、下一页
        state.page.shortcuts = el.querySelectorAll('.shortcuts');
    }
    function init(state) {
        let max = state.page.Max;//总页数
        let current = state.page.current = state.config.current;//当前页
        let insert = state.page.insert;//插入位置
        let left = 1;//启始页
        insert.innerHTML = '';
        let pages = new Array(max)
            .fill(0)
            .map((dummy, index) => index + left)
            .filter(el => el > 0);

        pages.forEach(page => {
            let btn = document.createElement('a');
            btn.href = `#`;
            btn.innerHTML = page;
            insert.appendChild(btn);
            //把按钮上的页数记录在当前按钮中
            btn.$page = page;
            if (current == page) {
                btn.classList.add('active');
            }
        })
        state.page.buttons = insert.querySelectorAll('a');
    }
    function bindEvents(state) {
        state.el.addEventListener('click', e => {
            let et = e.target;
            let page = et.$page;
            if (page) {
                setCurrent(state, page);
            }
            if (et.innerHTML == "«") {
                setCurrent(state, state.page.current - 1);
            } else if (et.innerHTML == "»") {
                setCurrent(state, state.page.current + 1);
            }
        })
    }
    function setCurrent(state, page) {
        console.log(page);
        if (page < 1)
            return setCurrent(state, 1);

        if (page > state.page.Max)
            return setCurrent(state, state.page.Max);
        state.page.current = page;
        state.page.buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.$page == page)
                btn.classList.add('active');
        })
    }
})();