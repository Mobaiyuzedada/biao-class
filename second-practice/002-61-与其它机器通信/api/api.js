var $ = require('axios');

create();
function create(data) {
    $.post('http://localhost:3000/api/post', { any: 'dry' })
        .then(res => {
            if (res.status = 'ok')
                console.log('done');
        })
}