const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer((req, res) => {
    console.log('request come', req.url);

    const html = fs.readFileSync('test.html');
    if (req.url === '/') {
        res.writeHead(302, {//只有302的头会进行跳转[临时跳转],永久跳转301
            'Location': '/new'
        })
        res.end('');
    }
    if (req.url === '/new') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end('<div>this is content</div>')
    }
}).listen(8888, () => {
    console.log('listened on port 8888');
})


