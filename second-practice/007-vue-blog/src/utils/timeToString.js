export default function timetoString(timeStamp, completed) {
    let date = new Date(timeStamp);
    if (completed) {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}:${date.getMinutes()}`
    }
    else {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
}