function multi(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2 * num);
        }, 2000);
    })
}


// function test() {
//     let result
//     multi(3).then(r => {
//         result = r
//     });
//     console.log(result);
// }
// async function test() {
//     let result=await multi(3)
//     console.log(result);
// }
// test();
async function test() {
    let result1 = await multi(1);
    let result2 = await multi(2);
    let result3 = await multi(3);
    console.log(result1 + result2 + result3);
}
test();
//结果:
    //6
    //我在后面但先执行
    //6