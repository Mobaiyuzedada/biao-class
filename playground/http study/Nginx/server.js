const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    console.log('request come', req.headers.host);

    const html = fs.readFileSync('index.html');
    res.writeHead(200, {
        'Content-Type': 'text/html',
    })
    res.end(html);
}).listen(8888, () => {
    console.log('listened on port 8888');
})


