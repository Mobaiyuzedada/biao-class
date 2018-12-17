
window.rq = {
    get,post,
}





function get(url, onSuccess) {
    send(url,'get',null,onSuccess);
}
function post(url, data) {
    send(url,'post',data,onSuccess,onError)
}

function send(url,method, data, onSuccess, onError) {
    let http = new XMLHttpRequest();
    http.open(method, url);
    http.send();

    http.addEventListener('load', () => {
        let res = JSON.parse(http.responseText);
        console.log(http.getAllResponseHeaders());
        onSuccess && onSuccess(res);
        console.log(onSuccess );
    })
}
