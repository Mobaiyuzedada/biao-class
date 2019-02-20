const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./server/router.post');
const body_parser = require('body-parser');

// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Content-Type', 'application/json;charset=utf-8');
//     next();
// });

mongoose.connect('mongodb://localhost:27017/007_vue_blog');
const db = mongoose.connection;
db.once('open', () => console.log('mongodb opened success'));
db.once('error', () => console.log('mongodb opened failed'));

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(router);




app.listen(3007, () => {
    console.log('listened');
})