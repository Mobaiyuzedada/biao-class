# CORS跨域请求的限制与解决
由于浏览器著名的```同源策略```的限制。当需要访问不同源的服务时，需要服务端允许跨域访问。下面是一个例子:
```js
//server.js
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    console.log('request come', req.url);

    const html = fs.readFileSync('test.html', 'utf8');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(html);
}).listen(8888, () => {
    console.log('listened on port 8888');
})
```
```js
//server2.js
const http = require('http');

http.createServer((req, res) => {
    console.log('request come', req.url);
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'//不安全。允许所有
        'Access-Control-Allow-Origin': 'http://baidu.com' //只允许特定的服务跨域
    })

    res.end('123');
}).listen(8887)
```
```js
//test.html <script></script>
let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://127.0.0.1:8887');
xhr.send();
```
这里请求已经发送，内容也已经返回了。但是浏览器解析内容的时候发现没有跨域允许。就会报错。这是浏览器提供的一个功能。其它http工具比如curl都没有跨域的概念。     
## 使用JSONP跨域
使用```<script>```标签也可以实现跨域
```js
//test.html <script></script>
<script src="http://127.0.0.1:8887/"></script>
```
浏览器允许```<link>、<script>、<img>```标签路径加载时允许跨域。JSONP实现原理就是在script标签里加载链接。这个链接访问了服务器的某一个请求并返回内容。

# CORS跨域限制以及预请求验证
## CORS预请求
在跨域的时候默认允许情形，不需要预请求的有：
- 允许的方法有```GET```,```HEAD```,```POST```。这三种不需要预请求,其它如PUT等都需要
- 允许的Content-Type有```text/plain```,```multipart/form-data```,```application/x-www-form-urlencoded```
- 其它限制，比如请求头限制，如：headers:{'X-Test-Cors':'123'}这种。具体参见：<a target="_blank" style="color:#0366d6" href="https://fetch.spec.whatwg.org/#cors-safelisted-request-header">CORS</a>    
具体实现预请求的方法如下：
```js
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':'X-Test-Cors',//允许特定的请求头
        'Access-Control-Allow-Methods':'POST,PUT,Delete,GET'//允许特定的方法
        'Access-Control-Max-Age':'1000'//上述三个操作被允许的时间，即在1000s内，上述操作只需进行第一次。不用再发送OPTIONS的请求来验证是否允许
    })
```
通过使用上述操作。会多发送一个Method为OPTIONS的预请求，来与服务端验证。服务端根据OPTIONS请求告诉浏览器接下来实际发送的请求是允许的。

# 缓存Cache-Control
## 可缓存性
- public HTTP经过的任何地方都可以缓存(网络上有很多代理服务器都可以缓存)
- private 只有发起请求的浏览器可以进行缓存
- no-cache 可以在本地，或proxy服务器进行缓存。但每次发请求的时候都要去服务器验证，服务器允许使用本地缓存，才可以使用这部分缓存。
## 到期
- max-age=&lt;seconds&gt; 缓存seconds后过期。过期后浏览器需要重新发送请求到服务端获取新的内容。
- s-maxage=&lt;seconds&gt; 会代替max-age,只在代理服务器中生效。即，都设置在浏览器中max-age依然会生效，但在代理服务器中s-maxage会生效。
- max-stale=&lt;seconds&gt; 是发起请求方主动带的设置，意思是即使缓存已经过期，但在seconds时间内，依然可以使用过期的缓存，而不用去服务端重新请求。在浏览器中用不到。只在发起端有用。
## 重新验证
- must-revalidate 在设置了max-age缓存中，如果已经过期了，必须去服务端去发送这个请求重新获取这部分数据。来验证内容是否真的过期了，而不能直接使用本地缓存。
- proxy-revalidate 用在缓存服务器中，作用同上       
这两个头基本不会用到。
## 其它
- no-store 本地和代理服务器都不允许存缓存。每次都需要到服务端请求内容。
- no-transform 告诉代理服务器不允许对返回内容进行修改。     
注：所有的头都只有声明性的作用。没有强制约束力。
## 实操
```js
//test.html
<script src="/script.js"></script>
```
```js
//server2[服务端]
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    console.log('request come', req.url);

    if (req.url === '/') {
        const html = fs.readFileSync('test.html', 'utf8');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(html);
    }
    if (req.url === '/script.js') {
        const html = fs.readFileSync('test.html', 'utf8');
        res.writeHead(200, {
            'Content-Type': 'text/javascript',
            'Cache-Control':'max-age=20'//20s内使用缓存
        })
        res.end('console.log("script loaded twice")');//如果在20s内更改此处内容，服务端虽然会 返回新的内容，但浏览器依然会使用本地之前的缓存。
    }
}).listen(8888, () => {
    console.log('listened on port 8888');
})
```
这里设置了客服端的的缓存，在设定的时间内不会通过服务端验证，使用本地缓存。速度会很快，因为不用经过网络。但服务端更新后可能会不及时更新。常见的前端解决的方案是，在打包的时候，打包完成的js会根据里面的内容和静态资源的结果计算生成hash码加在名字后面。因此如果内容不变，hash不变，url路径不变就可以使用缓存。如果hash变化，那么url就会有变化，那么就会是一个新的静态资源请求，从而达到更新缓存的目的。     

# 资源验证
## 缓存工作原理
在有Cache-Control的情况下，示意图如下：
<img src="http://localhost:1234/api/media/1553834945444-%E7%BC%93%E5%AD%98%E5%B7%A5%E4%BD%9C%E7%A4%BA%E6%84%8F%E5%9B%BE.png">
## 验证头
### Last-Modified
上次修改时间，主要配合```If-Modified-Since```或```If-Unmodified-Since```使用。如果请求一个资源，返回的header里面有Last-Modified头，指定了一个时间。在下一次浏览器发起请求的时候就会通过If-Modified-Since把它带到服务器，服务器通过读取里面的值，对比资源上次修改的时间，如果和If-Modified-Since里的时间相同。说明这个资源还没有被重新修改过，服务器就可以告诉浏览器直接使用缓存的资源。
### Etag
更为严格的验证，通过数据签名进行验证。如果资源的内容只要有任何修改，数据签名就会不同，最常见的做法就是hash计算(同上课js打包)。下一次浏览器发送请求的时候就会通过```If-Match```或```If-Non-Match```把上次服务器返回的签名带过去，服务器通过对比签名判断资源是否修改，来决定浏览器是否能使用缓存。
## 实操
因为不是很懂，就不写上去了。详见：<a style="color:0366d6" target="_blank" href="https://www.bilibili.com/video/av45501122/?p=13">13课</a>

# Cookie和Session
## Cookie
- 通过Set-Cookie设置。浏览器保存Cookie后，下一次访问的时候就会带上Cookie来保证返回的数据是这个用户的。
- 下次请求会自动带上
- 键值对,可以设置多个
### Cookie属性
- max-age和expires设置过期时间
- Secure只在https的时候发送
- HttpOnly无法通过document.cookie访问。防止类似注入脚本的攻击。应禁止重要数据通过js访问。
## 实操
```js
//test.html部分
    console.log(document.cookie);//Cookie设置HttpOnly后，无法通过此属性访问
//server.js部分
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    console.log('request come', req.url);
    if (req.url === '/') {
        const html = fs.readFileSync('test.html', 'utf8');
        res.writeHead(200, {
            'Content-Type': 'text/html',
            // 'Set-Cookie':'id=123'//设置Cookie
            // 'Set-Cookie': ['id=123', 'abc=456']//Node.js里设置多个Cookie
            'Set-Cookie': ['id=123;max-age=2', 'abc=456;HttpOnly']//设置过期时间,expires是到xx时间点到期。
            //若不设置时间，则会在浏览器关闭的时候过期。
        })
        res.end(html);
    }
}).listen(8888, () => {
    console.log('listened on port 8888');
})
```
附注：可以通过domain属性设置二级域名访问Cookie,详见：<a style="color:0366d6" target="_blank" href="https://www.bilibili.com/video/av45501122/?p=14">14课</a>     

# HTTP长链接
Http请求发送的时候，要先创建TCP的连接，在其基础上把Http请求发送并接收返回。此时一个Http请求已经完毕，浏览器和服务端就会商量是否关闭TCP连接。如果不关闭，会有一定的消耗。但是在下次请求的时候，要重新创建连接，就会有网络延时的开销。好处是减少并发消耗。如果不关闭，在原有的TCP连接上进行发送。就不需要进行三次握手的消耗。在实际情况中，网站的并发量比较大，如果每次都重新都创建连接，会导致此过程次数过多，消耗比保持长连接消耗更大。且长连接可以设置Timeout，多少秒内没有在此TCP连接上有新请求，就关闭TCP连接。因此实际中都是使用长连接。可以通过Connection头进行设置。     

# 数据协商
服务端会根据请求端的头信息返回不同的数据。
## 分类
### 请求
### Accept[请求端]
- Accept 指定想要的数据类型
- Accept-Encoding 指定数据的编码方式，用来限制服务端用什么方式来压缩数据
- Accept-language 指定数据返回的语言
- User-Agent 用来表示浏览器的相关信息。比如区分移动端和PC段的浏览器，以决定返回什么样的页面
### Content[服务端返回]
- Content-Type 对应Accept，从Accept中选择一种数据格式用于实际返回的格式
- Content-Encoding 对应Accept-Encoding 具体使用了gzip/deflate还是其它压缩方式
- Content-Language 实际返回的语言格式

# Redirect
两点：慎用301，可以恰当的使用302，来进行暂时性的跳转。设定方法使用```'Location':'direct'```头进行设置

# CSP[Content-Security-Policy]
## 作用
- 限制资源获取，资源从哪里获取，请求发到哪里，都可以通过CSP来进行限制
- 报告资源获取越权
## 限制方式
- default-src限制全局，跟链接请求有关的，都可以限制作用范围
- 制定特定的资源类型，根据特定的资源类型来限制范围。资源类型有:
 - connect-src 请求发向的目标
 - img-src 图片可以从哪些网址加载
 - script/style-src 样式脚本从哪些网址加载
 - 还有frame/manifest/font/media-src等等
 附注：参见<a style="color:0366d6" target="_blank" href="https://www.bilibili.com/video/av45501122/?p=15">15课</a>
 <a style="color:0366d6" target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP">内容安全策略(CSP) </a>