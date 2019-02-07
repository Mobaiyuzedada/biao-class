var numbers = ['second', 'third'];
var len = numbers.push('4', 'end');
console.log('现在数组的长度：' + len);//现在数组的长度：4
console.log('现在的数组：' + JSON.stringify(numbers));//现在的数组：["second","third","4","end"]
len = numbers.unshift('begin');
console.log('现在数组的长度：' + len);//现在数组的长度：5
console.log('现在的数组：' + JSON.stringify(numbers));//现在的数组：["begin","second","third","4","end"]