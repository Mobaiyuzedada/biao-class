const post = require('../src/api/post.api');
const moment = require('moment');
moment.locale('zh-cn');//不填参数为获取当地时间,整个也可不填为自动获取系统当前时间

let now = moment().format();
var data = {
    title: 'test1111',
    content: '123444',
    date: now
}
var params = {
    id: '5c6c07f8871899304c4a161d',
    post: data
}
// post.createPost(data).then(res => {
//     console.log(res);
// });
// post.updatePostById(params).then(res => {
//     console.log(res);
// })
// post.fetchPostById(params.id).then(res => {
//     console.log(res);
// })
// post.fetchAll().then(res => {
//     console.log(res.posts);
// });
post.deletePostById(params.id).then(res => {
    console.log(res);
})



// let $ = require('axios');
// const moment = require('moment');
// moment.locale('zh-cn');//不填参数为获取当地时间,整个也可不填为自动获取系统当前时间

// let now = moment().format();
// var data = {
//     title: 'test',
//     content: '123',
//     date: now
// }




// $.put('http://localhost:3007/createPost', data).then(res => {
//     console.log(res.data);
// }).catch(err => {
//     console.log(err);
// })
// let id = '5c6c0218c54ffa164454590c';
// $.delete(`http://localhost:3007/deletePost/by-id/${id}`).then(
//     res => {
//         console.log(res.data);
//     }
// )
// $.post(`http://localhost:3007/updatePost/by-id/${id}`, data).then(res => {
//     console.log(res.data);
// })
// $.get(`http://localhost:3007/fetchPost/by-id/${id}`).then(res => {
//     console.log(res.data);
//     let date = new Date(res.data.post.date)
//     let time = date.toLocaleString();
//     console.log(time);
// })
//查询所有
// $.get('http://localhost:3007/fetchAll').then(res => {
//     console.log(res.data);
// })
// var time = '2019-02-19T06:24:46.499Z';
// console.log(time);  //2019-01-21T06:25:50.000Z
// var d = new Date(time);
// console.log(d);   //Sun Jan 20 2019 16:43:42 GMT+0800

// console.log(d.getTime());  //这个全输入时间戳


// var h = d.getHours();//12
// var m = d.getMinutes(); //12
// if (h < 10) {
//     h = "0" + h;
// }
// if (m < 10) {
//     m = "0" + m;
// }
// console.log(h + ':' + m)



// let myDate = new Date();
// let date = {
//     year: myDate.getFullYear(),
//     month: myDate.getMonth() + 1,
//     day: myDate.getDate(),
//     hour: myDate.getHours(),
//     minute: myDate.getMinutes(),
//     second: myDate.getSeconds()
// }
// let time = new Date(date.year, date.month - 1, date.day, date.hour, date.minute, date.second);