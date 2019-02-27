const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const urlencoded = bodyparser.urlencoded({ extended: true });
const json = bodyparser.json();
const router = require('./server/user');

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


app.use(json);
app.use(urlencoded);
app.use(router);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/008_imitation_forum');
const db = mongoose.connection;
db.once("open", () => console.log("database open successed"))
db.once("error", () => console.log("database open failed"))

app.get('/', (req, res) => {
    res.send('hello');
})
app.listen(3008, () => console.log('listened'))