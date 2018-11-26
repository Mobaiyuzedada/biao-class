//隐藏本页显示下页
//注意这个在一开始会有一段空白，因为setInterval()要过一秒才会执行


const slides = document.querySelectorAll('.item');
let current = slides.length - 1; //lastIndex


start();

function start() {
    flip();
    setInterval(() => {
        flip();
    }, 5000);
}

function flip() {
    
    let now = getNow();
    let next = getNext();
    

    hide(now);
    show(next);

    current++;
    if(current>=slides.length)
    current=0;

}
function getNow() {
    return slides[current];
}
function getNext() {
    if(current===slides.length-1)
    return slides[0];
    else
    return slides[current + 1];
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

