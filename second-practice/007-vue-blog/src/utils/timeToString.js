export default function timetoString(timeStamp) {
    let date = new Date(timeStamp);
    return `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日`;
    //   else{
    //       return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日${date.getHours()}`
    //   }
}