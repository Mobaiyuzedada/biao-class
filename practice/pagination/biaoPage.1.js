/*
|-------------------------------------------------------
| 翻页插件
|-------------------------------------------------------
*/
; (function () {
    'use strict';
    window.biaoPage = {
        boot,
    };




    const DEFAULT_CONFIG = {
        limit: 10,
    };

    function boot(settings) {
        // config=Object.assign({},DEFAULT_CONFIG,settings);
        let config = { ...DEFAULT_CONFIG, ...settings };//ES6
        let state = {
            config,
            currentPage: config.currentPage,
        }

        prepare(state);
        render(state);
        bindEvents(state);
    }
    /*
    |-------------------------------------------------------
    | 准备要插入按钮的位置。并记录到state中(state.el[biao-page])
    |-------------------------------------------------------
    */
    function prepare(state) {
        let el = document.createElement('div');
        el.classList.add('biao-page')
        el.innerHTML = `
            <span class="shortcuts">
                <button>上一页</button>
            </span>
            <span class="page-list">
                
            </span>
            <span class="shortcuts">
                <button>下一页</button>
            </span>
            `
        state.root = document.querySelector(state.config.selector);//插入位置
        state.pageList = el.querySelector('.page-list');//按钮渲染位置

        state.el = el;
        state.root.appendChild(el);
    }

    /*
    |-------------------------------------------------------
    | 计算有多少按钮(pageAmount)并记录到state中
    | 记录当前是第几页并记录到btn.$page中
    | 给设置的初始页[state.currentPage]添加高亮样式
    | 选中所有创建好的按钮记录到state.buttons中
    | 将循环中每一页[page]记录到每一个按钮的[$page]属性中
    |-------------------------------------------------------
    */
    function render(state) {
        let pageAmount = state.pageCount = Math.ceil(state.config.amount / state.config.limit);//页数=搜索结果/每页显示条数[结果向上取整]
        /*
        |-------------------------------------------------------
        | Math.ceil(),Math.round(),Math.floor()
        |-------------------------------------------------------
        | description:进位，四舍五入，退位
        */
        for (let i = 0; i < pageAmount; i++) {
            let page = i + 1;
            let btn = document.createElement('button');
            btn.classList.add('biao-page-tiem')
            btn.innerHTML = page;
            btn.$page = page;

            if (state.currentPage === page) {
                btn.classList.add('clicked');//如果页面是当前页，就高亮
            }
            state.pageList.appendChild(btn);
        }
        state.buttons = state.pageList.querySelectorAll('.biao-page-item');
        console.log(state);
    }

    /*
    |-------------------------------------------------------
    | 给[biao-page]中的所有按钮添加点击事件
    | 让page等于当前点击目标的[$page],如果该值存在,
    | 就触发回调函数,回传给用户当前点击的[page]页数和[state]网页状态
    | 
    |-------------------------------------------------------
    */
    function bindEvents(state) {
        state.el.addEventListener('click', e => {
            let page = e.target.$page;
            if (page) {
                let onChange = state.config.onChange;
                setCurrentPage(state, page);

                onChange && onChange(page, state);//回传给用户正在点击的页数
            }
        });
    }

    /*
    |-------------------------------------------------------
    | 让初始页[state.currentPage]等于当前点击的页面[page]
    | 循环所有按钮，让不等于当前页的按钮去除高亮样式
    | 给等于当前页的按钮添加高亮样式
    |-------------------------------------------------------
    */
    function setCurrentPage(state, page) {
        // console.log(state,page );
        // if(page<1)
        //     setCurrentPage(1);
        // if(page>state.pageCount)
        //     setCurrentPage(pageCount)
        state.currentPage = page;
        state.buttons.forEach(btn => {
            if (btn.$page != page) {
                btn.classList.remove('clicked');
                // console.log( btn.$page,page);
                return; //此处return 只跳出if语句
            }
            btn.classList.add('clicked');
        })
    }
})();