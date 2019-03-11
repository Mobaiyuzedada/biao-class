var $ = require('axios');

var params = {
    title: 'dssaa萨愚a',
    content: 'dddzzzzsss',
}

//创建测试
// $.put('http://localhost:3000/createPost', params).then(r => {
//     if (r.status === 200)
//         console.log(r.data);
// }).catch(err => {
//     console.error(err);
// })


//更新测试
// $.post('http://localhost:3000/updatePost/by-id/5c3f45ba1058ad2500499023', params).then(r => {
//     if (r.status === 200)
//         console.log('更新成功');
// }).catch(err => {
//     console.error(err);
// })


//删除测试
// $.delete('http://localhost:3000/deletePost/by-id/5c3f45ba1058ad2500499023').then(r => {
//     if (r.status === 200)
//         console.log('更新成功');
// }).catch(err => {
//     console.error(err);
// })

//查询测试
// $.get('http://localhost:3000/findPost/by-id/5c3f530d75b8d821808f6d97').then(r => {
//     if (r.status === 200)
//         console.log(r.data);
// }).catch(err => {
//     console.error(err);
// })
//查询所有

// $({
//     method: 'post',
//     url: 'http://localhost:3000/updatePost/by-id/5c3f45ba1058ad2500499023',
//     data: params,
// }).then(r => {
//     if (r.status === 200)
//         console.log('更新成功');
// }).catch(err => {
//     console.error(err);
// })


























// $.post('http://localhost:3001/api/post', params).then(r => {
//     if (r.status === 200)
//         console.log(r.data);
// }).catch(err => {
//     console.error(err);
// })
// $.post('http://localhost:3001/api/update/5c3f4b5ef7eb960334be20b1', params).then(r => {
//     if (r.status === 200)
//         console.log(r.data);
// }).catch(err => {
//     console.error(err);
// })