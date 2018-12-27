; (function () {
    'use strict';


    window.rq = {
        get,
        post,
    };


    function get(url, onSuccess, onError) {
        send('get', url, null, onSuccess, onError);
    }

    function post(url, data) {


    }

    function send(method, url, data, onSuccess, onError) {
        let http = new XMLHttpRequest();
        http.open(method, url);
        http.send();

        http.addEventListener('load', () => {
            let data = JSON.parse(http.responseText);
            onSuccess && onSuccess(data);
        });
    }


})();