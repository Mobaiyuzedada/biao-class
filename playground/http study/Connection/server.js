const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    console.log('request come', req.url);

    const html = fs.readFileSync('test.html', 'utf8');
    const img = fs.readFileSync('test.jpg');
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Connection':'close'
        })
        res.end(html);
    } else {
        res.writeHead(200, {
            'Content-Type': 'image/jpg',
            'Connection':'close'
        })
        res.end(img)
    }
    res.end(html);
}).listen(8888, () => {
    console.log('listened on port 8888');
})


