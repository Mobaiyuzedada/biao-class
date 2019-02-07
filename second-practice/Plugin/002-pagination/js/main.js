let custom = {
    el: '.footer',
    amount: 101,
    limit: '11',
    current: 2,
}
let customA = {
    el: '#a',
    amount: 50,
    limit: '7',
    current: 1,
}
let customB = {
    el: '#b',
    amount: 101,
    limit: '15',
    current: 1,
}
let start = pagination.start;
start(custom).then(data => {
    console.log(data);
});
start(customA).then(data => {
    console.log(data);
});
start(customB).then(data => {
    console.log(data);
});

