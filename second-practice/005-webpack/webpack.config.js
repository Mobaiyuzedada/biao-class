// const path = require('path');
// console.log(path.resolve(__dirname, 'bundle.js'));
// module.exports = {
//     entry: './a.js',
//     output: {
//         //在path目录下生成bundle.js
//         path: path.resolve(__dirname, 'js'),//或者直接写__dirname,如果填第二个参数则是在xxx目录下生成。
//         filename: 'bundle.js'
//     }
// }
// const path = require('path');
// console.log(path.resolve(__dirname, 'bundle.js'));
// module.exports = {
//     entry: {
//         home: './js/home.js',
//         signup: './js/signup.js'
//     },
//     output: {
//         path: path.resolve(__dirname, './dist'),
//         filename: '[name].bundle.js'
//     }
// }

const path = require('path');
console.log(path.resolve(__dirname, 'bundle.js'));
module.exports = {
    mode: 'development',//开发模式不压缩不优化
    entry: "./js/index",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]//越靠右越先加载
            }
        ]
    }
}