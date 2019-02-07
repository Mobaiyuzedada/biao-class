let numbers = [2, 22, 222, 2222];
var newArr = [];

newArr = numbers.filter((item, index, arr) => item > 22)
console.log("newArr:" + JSON.stringify(newArr));//newArr:[222,2222]


let res2 = [
    { name: 'dry', age: '11', sex: 'male' },
    { name: 'xzz', age: '20', sex: 'female' },
    { name: 'xdd', age: '15', sex: 'male' },
    { name: 'xjj', age: '25', sex: 'male' }
];
newArr = res2.filter((item, index, arr) => {
    return item.age > 15;
})
console.log("newArr:" + JSON.stringify(newArr));//newArr:[{"name":"xzz","age":"20","sex":"female"},{"name":"xjj","age":"25","sex":"male"}]
newArr = res2.filter((item, index, arr) => {
    return index > 2;//筛选出res2[3],res[4]
})                   
console.log("newArr:" + JSON.stringify(newArr));//newArr:[{"name":"xjj","age":"25","sex":"male"}]
