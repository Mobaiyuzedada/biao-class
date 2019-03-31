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
            'Set-Cookie': ['id=123;max-age=2', 'abc=456;HttpOnly']//设置过期时间,expires是到xx时间点到期
        })
        res.end(html);
    }
}).listen(8888, () => {
    console.log('listened on port 8888');
})

