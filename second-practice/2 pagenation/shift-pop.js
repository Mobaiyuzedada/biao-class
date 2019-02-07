var numbers = ['begin', 'second', 'third', 'end'];
var el = numbers.shift();
console.log('被删除的元素:' + el);//被删除的元素:begin
console.log('操作后的数组:' + JSON.stringify(numbers));//操作后的数组:["second","third","end"]
el = numbers.pop();
console.log('被删除的元素:' + el);//被删除的元素:end
console.log('操作后的数组:' + JSON.stringify(numbers));//操作后的数组:["second","third"]