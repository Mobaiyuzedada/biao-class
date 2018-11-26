// 选中.slider
const parent = document.querySelector('.slider');
// 在.slider中选中所有的.item
const slides = parent.querySelectorAll('.item');
// 默认从第一张开始
let current = 0;
// 拿到最后一张的索引
let lastIndex = slides.length - 1;

boot();

function boot() {
  // 直接显示第一张，防止空等一秒
  show(slides[current]);

  setInterval(() => {
    flip();
  }, 5000);
}

/**
 * 一次翻页
 */
function flip() {
  // 自增当前页
  ++current;

  // 如果自增后超过最大页就重置为零（从头开始）
  if (current >= slides.length)
    current = 0;

  let prev = getPrev();
  let next = slides[current];

  hide(prev);
  show(next);
}

/**
 * 获取前一页
 * @return {Node}
 */
function getPrev() {
  if (current == 0)
    return slides[lastIndex];
  else
    return slides[current - 1];
}

/**
 * 隐藏元素
 * @param {HTMLElement} el
 */
function hide(el) {
  if (!el)
    return;

  el.style.opacity = 0;
}

/**
 * 隐藏元素
 * @param {HTMLElement} el
 */
function show(el) {
  if (!el)
    return;

  el.style.opacity = 1;
}