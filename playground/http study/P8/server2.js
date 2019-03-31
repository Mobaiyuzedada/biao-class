const http = require('http');

http.createServer((req, res) => {
    console.log('request come', req.headers.origin);
    res.writeHead(200, {
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Origin': 'http://www.baidu.com',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':'X-Test-Cors',
        'Access-Control-Allow-Methods':'POST,PUT,Delete,GET',
        'Access-Control-Max-Age':'1000'
    })
    // if (req.headers.origin == "http://localhost:8886") {
    //     res.writeHead(200, {
    //         // 'Access-Control-Allow-Origin': '*',
    //         // 'Access-Control-Allow-Origin': 'http://www.baidu.com',
    //         'Access-Control-Allow-Origin': req.headers.origin
    //     })
    // }
    // res.writeHead(200, {
    //     // 'Access-Control-Allow-Origin': '*',
    //     // 'Access-Control-Allow-Origin': 'http://www.baidu.com',
    //     'Access-Control-Allow-Origin': 'http://localhost:8888'
    // })

    res.end('111');
}).listen(8887)