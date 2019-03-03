<template lang="pug">
    div.container.clear
        div#left.col-6: div.card
            h3.title settings
            div.setting-options
                span: a 隐私设置
                span: router-link(to="/settings/people") 账号信息
                span: a 收藏文章
                span: a 管理屏蔽
                span: a 两步验证
                span: a 头像上传
                span: router-link(to="/settings/password") 更改密码
                span: a 安全设置
        div#right.col-18
            router-view
        
</template>

<style lang="scss">
// @import '../../style/global.scss';
#left {
  div.setting-options {
    line-height: 2em;
    padding: 0;
    span {
      display: block;
      padding-left: 1em;
      a {
        color: #333;
        display: block;
        word-break: break-all;
      }
      &:hover {
        background: #f0f0f0;
      }
    }
  }
}
#right {
  .form-table {
    tr {
      td.modify {
        a {
          transition: all ease 0.3s;
          color: rgba(236, 55, 55, 0.959);
          word-break: keep-all;
          &:not(:hover) {
            border-bottom: 1px solid transparent;
          }
          opacity: 0;
        }
      }
    }
    tr:hover {
      td.modify {
        a {
          opacity: 1;
          transition: none;
        }
      }
    }
  }
}
</style>