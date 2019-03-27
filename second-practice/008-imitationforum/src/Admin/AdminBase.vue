<template lang="pug">
    div.container
        div.clear
            div.col-6.sildebar#left
                div.card
                    div.title: h2 功能
                    div.function
                        div: router-link(to="/admin/user") 用户管理
                        div: router-link(to="/admin/post") 帖子管理
            div.col-18#right
                router-view
</template>
<style lang="scss">
.container {
  max-width: 1080px;
  margin: 0 auto;
}
.card {
  h2 {
    margin: 0;
  }
  border: none;
  .function {
    font-size: 16px;
    color: #202020;
    div {
      padding: 4px 4px 4px 10px;
    }
    div:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    a {
      display: block;
      color: inherit;
    }
  }
}
</style>
<script>
export default {};
</script>