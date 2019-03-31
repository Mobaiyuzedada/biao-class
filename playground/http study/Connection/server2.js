const http = require('http');

http.createServer((req, res) => {
    console.log('request come', req.headers.origin);
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Test-Cors',
        'Access-Control-Allow-Methods': 'POST,PUT,Delete,GET',
        'Access-Control-Max-Age': '1000'
    })
    res.end('111');
}).listen(8887)