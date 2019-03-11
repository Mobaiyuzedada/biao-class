function pad(num) {//处理小时和秒，使个位数的显示为0x的格式，如：9h2s->09h02s
    let tmp = '0' + num.toString();//可以是'00'或'000'以上应该都行
    return tmp.substring(tmp.length - 2);//保留后两位
}


export default function timeToString(timestamps, completed) {
    let date = new Date(timestamps);
    let today = new Date();
    if (completed) {
        console.log(today.getDate());
        console.log(date.getDate());
        return `
                ${today.getDate() == date.getDate() ? '今天' :
               `${date.getFullYear()}年
                ${date.getMonth() + 1}月
                ${date.getDate()}日 `}
                ${pad(date.getHours())}:
                ${pad(date.getMinutes())}:
                ${pad(date.getSeconds())} `
    } else {
        return `
        ${today.getDate() == date.getDate() ? '今天' :
       `${date.getFullYear()}年
        ${date.getMonth() + 1}月
        ${date.getDate()}日 `}`
    }
}