
let newArr = [];
// let res2 = [{ name: 'dry' }, { age: '11' }, { sex: 'male' }];


let i = 11;
let numbers = [3, 10, 12, 33];
function multiplyArrayElement(item) {
    return item * i;
}
newArr = numbers.map(item =>
    item + 1
)
console.log(newArr);
// //newArr=numbers.map(multiplyArrayElement(item))
// var newArr = numbers.map(multiplyArrayElement);
// console.log('newArr:' + JSON.stringify(newArr));//newArr:[33,110,132,363]

// let res = [{ name: 'dry', age: '11', sex: 'male' }];
// newArr = res.map(item => {
//     return {
//         title: item.name,
//         age: item.age,
//         gender: item.sex
//     }
// });
// console.log('newArr:' + JSON.stringify(newArr));


// let res2 = [{ name: 'dry' }, { age: '11' }, { sex: 'male' }];
// newArr = res2.map((item, index, arr) => {
//     var jsonData = item;
//     var data = JSON.stringify(jsonData);
//     console.log(`元素${index}：${data}`);
//     return item;
// })
// newArr = JSON.stringify(newArr);
// console.log(`newArr：${newArr}`);

