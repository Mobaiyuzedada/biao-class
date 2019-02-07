const express = require('express');
const app = express();

const bp = require('body-parser');
const jsn = bp.json();
const ulp = bp.urlencoded();


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


const router = require('./server/server');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/any_for_fun');
const db = mongoose.connection;

db.once('error', () => console.log('Mongodb connection failed'));
db.once('open', () => console.log('Mongodb connection opened'));


app.use(jsn);
app.use(ulp);
app.use(router);


app.listen('3000', () => {
    console.log('listened');
})