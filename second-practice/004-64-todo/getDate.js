
function getDate() {
    var myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let time = myDate.toLocaleTimeString();
    let str = year + '/' + month + '/' + day + ', ' + time;
    console.log(str);
}