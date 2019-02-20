const config = {
    database: {
        address: 'mongodb://localhost:27017/',
        db: '007_vue_Blog',
    },
    port: 123456,
    favicon: null,  // local file path
    avatar: null,   // http/https url
    title: 'ntzyz\'s space',
    subtitle: '∠( ᐛ 」∠)_',
    footer: [
        'Copyright © 2016-2018 ntzyz. All rights reversed.',
        'Except where otherwise noted, content on this blog is licensed under CC-BY 2.0.'
    ],
    url: 'http://localhost:123456', // no slash at the end of url
    language: 'zh-CN',
    components: {
        title: true,
        categories: true,
        tags: true,
        replies: true
    },
    meta: {
        themeColor: '#FFFFFF'
    },
    page: {
        size: 5,
    },
    reply: {
        enableMarkdownSupport: true,
    }
};

module.exports = config;
