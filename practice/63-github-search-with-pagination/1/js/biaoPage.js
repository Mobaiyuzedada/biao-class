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
            page: {},
        }


        prepare(state);
        render(state, 10);
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
                <button class='prev'>上一页</button>
            </span>
            <span class="page-list">
                
            </span>
            <span class="shortcuts">
                <button class='next'>下一页</button>
            </span>
            `
        state.root = document.querySelector(state.config.selector);//插入位置
        state.page.pageList = el.querySelector('.page-list');//按钮渲染位置
        state.page.prev = el.querySelector('.prev');//第一页
        state.page.next = el.querySelector('.next');
        state.page.prev.$page = '上一页';
        state.page.next.$page = '下一页';
        state.pageStart = state.currentPage;
        state.page.pageLim = state.config.pageLim - 1;
        state.pageLast = state.currentPage + state.page.pageLim;

        console.log(state);

        state.el = el;//记录插内容
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
        let pageAmount = state.page.pageCount = Math.ceil(state.config.amount / state.config.limit);//页数=搜索结果/每页显示条数[结果向上取整]
        if (state.currentPage > pageAmount) {
            return;
        }
        state.page.pageList.innerHTML = '';
        /*
        |-------------------------------------------------------
        | Math.ceil(),Math.round(),Math.floor()
        |-------------------------------------------------------
        | description:进位，四舍五入，退位
        */


        console.log(state.pageStart, state.pageLast);
        if (state.pageLast > pageAmount) {
            state.pageLast = pageAmount;
        }
        if (state.pageStart < 1) {
            state.pageStart = 1;
        }
        for (let i = state.pageStart; i <= state.pageLast; i++) {

            let btn = document.createElement('button');
            btn.classList.add('biao-page-item')
            btn.innerHTML = i;
            btn.$page = i;

            if (state.currentPage === i) {
                btn.classList.add('clicked');//如果页面是当前页，就高亮
            }
            state.page.pageList.appendChild(btn);
        }
        state.page.buttons = state.page.pageList.querySelectorAll('.biao-page-item');
        // console.log(state);
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
            console.log(page, state.pageStart, state.pageLast);
            // console.log(state.pageStart, page, state.currentPage, state.pageLast);

            if (typeof page !== 'string') {
                let onChange = state.config.onChange;
                setCurrentPage(state, page);

                onChange && onChange(page, state);//回传给用户正在点击的页数
            } else {
                pageTurning(state, page);
            }

            if (page === state.page.pageCount) {
                return;
            } else if (page === state.pageLast) {
                console.log('next');
                state.pageLast += state.page.pageLim;
                state.pageStart = page;
                state.currentPage = page;
                render(state);
                return;
            }
            if (page === 1) {
                return;
            } else if (page === state.pageStart) {
                console.log('prev');
                state.currentPage = page;
                state.pageStart = page - state.page.pageLim;
                state.pageLast = page;
                render(state);
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
        state.page.buttons.forEach(btn => {
            if (btn.$page != page) {
                btn.classList.remove('clicked');
                // console.log( btn.$page,page);
                return; //此处return 只跳出if语句
            }
            btn.classList.add('clicked');
        })
    }

    function pageTurning(state, page) {
        let prev = state.page.prev;
        let next = state.page.next;
        let btn = state.el.querySelector('.clicked');

        if (page === prev.innerText) {
            if (btn) {
                if (btn.$page === 1) {
                    state.currentPage = 1;
                    return;
                } else {
                    let btnPrev = btn.previousElementSibling;
                    state.currentPage = btnPrev.$page;
                    btn.classList.remove('clicked');
                    btnPrev.classList.add('clicked');
                }
            }
        } else if (page === next.innerText) {
            if (btn) {
                console.log(btn.$page );
                if (btn.$page === state.pageLast-1) {
                    if (state.pageLast-1=== state.pageCount)
                        state.currentPage =state.pageCount;
                    state.currentPage=btn.$page+1
                    state.pageStart = btn.$page+1;
                    state.pageLast = btn.$page+1 + state.page.pageLim;
                    render(state);
                    return;
                } else {
                    let btnNext = btn.nextElementSibling;
                    state.currentPage = btnNext.$page;
                    btn.classList.remove('clicked');
                    btnNext.classList.add('clicked');
                }
            }
        }
        console.log(page, state.currentPage);

    }
})();