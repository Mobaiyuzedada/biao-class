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

        const etag = req.headers['if-none-match'];
        console.log(etag);
        if (etag === '777') {
            res.writeHead(304, { //304资源未修改
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age=2000000,no-cache',//设置no-cache，经过服务器验证是否使用缓存
                'Last-Modified': '123',
                'Etag': '777'
            })
            res.end('555')
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age=2000000,no-cache',//设置no-cache，经过服务器验证是否使用缓存
                'Last-Modified': '123',
                'Etag': '777'
            })
            res.end('console.log("script loaded")');
        }
    }
}).listen(8888, () => {
    console.log('listened on port 8888');
})

