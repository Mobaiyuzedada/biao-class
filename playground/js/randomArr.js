/*
|-------------------------------------------------------
| 随机生成一个长度为10的整数类型数组
| 例如[2,55,10,3,4,5,11,10,11,20]
| 将其排列成一个新数组，要求新数组形式如下：[[2,3,4,5],[10,11],[20],[55]]
|-------------------------------------------------------
*/
let i = 1;
function randomArr() {
    var ranArr = new Array(10).fill(0).map(i => Math.round(Math.random() * 100));
    let newArr = new Array(11).fill(0).map(i => new Array());
    console.log(newArr);
    for (i = 0; i < 10; i++) {
        let m = Math.floor(ranArr[i] / 10);
        // console.log(m);
        // console.log(newArr[m]);
        // console.log(newArr[m]);
        newArr[m].push(ranArr[i])
    }
    newArr = newArr.filter(i => i.length > 0)
    console.log(newArr);
}
randomArr();