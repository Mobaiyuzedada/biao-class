const http = require('http');
const fs = require('fs');


http.createServer((req, res) => {
    console.log('request come', req.url);

    const html = fs.readFileSync('test.html', 'utf8');
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            // 'Content-Security-Policy': 'default-src http: https:'//只能http/https加载
            'Content-Security-Policy-Report-Only':'default-src \'self\'; https://cdn.bootcss.com/; report-uri report '
        })
        res.end(html)
    } else {
        res.writeHead(200,{
            'Content-Type':'application/javascript'
        })
        res.end('console.log("loaded script")')
    }
}).listen(8888, () => {
    console.log('listened on port 8888');
})


