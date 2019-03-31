const http = require('http');
const fs = require('fs');
const wait = (seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}

http.createServer((req, res) => {
    console.log('request come', req.headers.host);

    const html = fs.readFileSync('index.html', 'utf8');
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        res.end(html);
    }
    if (req.url === '/data') {
        res.writeHead(200, {
            // 'Cache-Control':'max-age=5,s-maxage=20,no-store'//代理缓存专用s-maxage
            'Cache-Control': 's-maxage=200',//代理缓存专用s-maxage
            'Vary': 'X-Test-Cache'
        })
        wait(2).then(() => {
            res.end('success')
        })
    }

}).listen(8888, () => {
    console.log('listened on port 8888');
})


