<template lang="pug">
  div.side-bar.admin-side-bar
    div.card
      h3.title Functions
      ul
        li: router-link(to="/admin/post/new") 创建文章
        li: router-link(to="/admin/post") 管理文章
</template>
<script>
export default {
  name:'AdminSideBar',
};
</script>
<style lang="scss">
@import "../../style/global.scss";

.admin-side-bar {
  ul {
    list-style: none;//前面的点
    padding:0;
    line-height: 2em;
  }
  li{
    padding-left: 1em;

    a{
      display: block;
      text-decoration: none;
    }
    a:hover{
      border:none;
    }
  }
  li:hover{//悬停时的效果
    background-color:mix($card_bg_color,lightgreen,80%)
  }
}
</style>