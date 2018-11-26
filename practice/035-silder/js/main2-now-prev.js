//显示本页，隐藏上页
//注意这个在一开始会有一段空白，因为setInterval()要过一秒才会执行
//想要一加载立刻执行需要先执行一次该事件


const slides = document.querySelectorAll('.item');
let current = 0;
let timer=null;

start();

function start() {
    clearInterval(timer);// 防止多次点击开启多个定时器.
    flip();
    setInterval(() => {
        flip();
    }, 1000);
}

function flip() {

    let now = getNow();
    let prev = getPrev();

    show(now);
    hide(prev);
    console.log(current);
    current++;
    
    if (current > slides.length - 1)
        current = 0;
}

function getNow() {
    return slides[current];
}
function getPrev() {
    if (current === 0)
        return slides[slides.length - 1];
    else
        return slides[current - 1];
}
function show(el) {
    if (!el)
        return;
    el.style.opacity = 1;
}
function hide(el) {
    if (!el)
        return;
    el.style.opacity = 0;
}

