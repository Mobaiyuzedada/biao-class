module.exports = {
    //跨域配置
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3008',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}