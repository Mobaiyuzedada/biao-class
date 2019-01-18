const express = require('express');
const app = express();
/**使用body-parser解析json和url中的非西欧字符
 * urlencoded用来解析request中body的urlencoded字符,只支持utf-8的编码的字符,也支持自动的解析gzip和zlib。 
 * 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
 *  */
const bp = require('body-parser');
const jsn = bp.json();
const ulp = bp.urlencoded({ extended: true });
//引入中间路由,即后端接口
const router = require('./server/router.post.js');
//连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vue_blog');
const db = mongoose.connection;
//给db绑定一次性事件监听是否开启成功
db.once('error', () => console.log('Mongodb connection error'))
db.once('open', () => console.log('Mongodb connection successed'))

app.use(jsn);
app.use(ulp);
app.use(router);

app.listen(3000, () => {
    console.log('listened');
})

