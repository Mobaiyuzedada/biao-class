const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer((req, res) => {
    console.log('request come', req.url);

    const html = fs.readFileSync('test.html');
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Encoding':'gzip'
        // 'X-Content-Type-Options': 'nosniff'//基本不会用到。作用是防止浏览器自动预测返回的头信息，导致数据泄露
    })
    res.end(zlib.gzipSync(html));//压缩可以加快网络传输
}).listen(8888, () => {
    console.log('listened on port 8888');
})


