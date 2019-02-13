const express = require('express');
const app = express();
const router = require('./server/router');
const bp = require('body-parser');
const ulp = bp.urlencoded({ extended: true });
const json = bp.json();


//跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


app.use(ulp);
app.use(json);
app.use(router);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongodb_todo');
var db = mongoose.connection;
db.once('open', () => console.log('open database successed'));
db.once('error', () => console.log('open db failed'));
app.get('/', (req, res) => {
    res.send('Here is home');
})


app.listen(3005, () => {
    console.log('listened or port 3005');
})