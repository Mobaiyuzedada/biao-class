<template lang="pug">
  div#app
    #left
      div#left-wrapper 
        router-view(name="sidebbar")
        nav.sidebar
          h3.title 导航
          ul
            li: router-link(to="/") 首页
            li: router-link(to="/admin") 管理页 
            li: a.back(@click="back") RETURN
    #right
      router-view(name="default")
</template>
<script>
export default {
  name: "app",
  methods: {
    back() {
      window.history.go(-1);
    }
  }
};
</script>

<style lang="scss">
@import "./style/global.scss";

body {
  margin: 0;
  color: $font_color;
  min-height: 100vh;
  height: 100%;
  overflow-y: scroll;
  background-color: $background_color;
  font-family: Microsoft Yahei UI;
}
#app {
  max-width: 1280px;
  padding: 0 1em 0 1em;
  margin: 0 auto;
}
footer {
  font-size: 12px;
  color: grey;
  text-align: center;
  padding: 0 0 14px 0;
}
@media screen and (min-width: 800px) {
  #app {
    display: flex;
  }
  #left {
    flex-shrink: 0;
    flex-grow: 0;
    width: 300px;
    height: fit-content;
    padding-right: 15px;
    position: relative;
    div#left-wrapper {
      width: 300px;
      position: relative;
    }
  }
  #right {
    flex-grow: 1;
    position: relative;
    overflow: hidden;
    padding: 0 4px 0 4px;
  }
}
@media screen and (max-width: 800px) {
  #app {
    display: block;
    padding: 0;
  }

  #left {
    width: 100%;
  }

  .hide-on-mobile {
    display: none;
  }
}
nav.sidebar {
  //这里需要加个类名增加权重来覆盖a:not(.button)的样式
  background-color: $card_bg_color;
  box-shadow: 1px 1px 3px $card_bg_color;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-top: 0px;
  padding-bottom: 1px;

  .title {
    margin: 0;
    padding: 4px 4px 4px 10px;
    color: $card_title_font_color;
    background-color: $card_title_bg_color;
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  }
  ul {
    list-style: none;
    padding: 0;
    line-height: 2em;
  }
  li {
    padding-left: 1em;
    a {
      display: block;
      text-decoration: none;
    }
    a:hover {
      border: none;
    }
  }
  li:hover {
    //悬停时的效果
    background-color: mix($card_bg_color, lightgreen, 80%);
  }
}
</style>
