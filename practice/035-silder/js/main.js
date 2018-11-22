
const parent = document.querySelector('.slider');
const slides = parent.querySelectorAll('.item');
let current = 0;
let lastIndex=slides.length-1;


boot();

function boot() {
    start();
}

function start() {
    setInterval(() => {
        loop();
    }, 1000);
}

function loop(){
    if(current>=slides.length)
    current=0;


    let prve=getPrev();
    let next=getNext();


    show(next);
    hide(prev);

    current++;
}

function getPrev() {
    return prev = current == 0 ? slides[lastIndex] : slides[current - 1];
}
function getNext(){
    return netx=slides[current];
    
}

function show(el) {
    el.style.opacity = 1;
}
function hide(el) {
    if (!el) return;
    el.style.opacity = 0;
}



