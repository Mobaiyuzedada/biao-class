const express = require('express');
const app = express();
const todo = require('./models/todo');
const bp = require('body-parser');
const ulp = bp.urlencoded({ extended: true });
const json = bp.json();
const router = require('./server/router');


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});



//这里解析的顺序得在路由前面，路由得在数据模型的前面
app.use(json);
app.use(ulp);
app.use(router);
app.use(todo);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo');
var db = mongoose.connection;
db.once('open', () => console.log('open database successed'));
db.once('error', () => console.log('open database failed'));
// var data = {
//     content: '明天去洒金桥',
// }
// todo.create(data).then(res => {
//     console.log('创建数据成功');
//     console.log(res);
// }).catch(e => console.log(e))


//设置允许跨域访问该服务.




app.get('/', (req, res) => {
    res.send('yo');
})
app.listen(3001, () => {
    console.log('server listened on port:3001');
})