<template lang="pug">
    div#dropdown
        button.dropdown-toggle(@click="toggle()" type="button" aria-expanded="false" aria-haspopup="true")
          span
        div.user.dropdown-menu(v-if="self&&!hidden")
            a.dropdown-item(href="#" @click="deletePost") 删除
            a.dropdown-item(href="#" @click="editPost") 编辑动态
            a.dropdown-item(href="#") 仅自己可见
        div.common.dropdown-menu(v-if="!self&&!hidden")
            a.dropdown-item(href="#") 点赞
            a.dropdown-item(href="#" :title="string==cut(string)?'':string") {{cut(string)}}
</template>
<script>
export default {
  name: "Dropdown",
  data() {
    return {
      hidden: true,
      string: "这是一个很长的很长的选项",
      self: ""
    };
  },
  props: ["islogin", "post"],
  mounted() {
    this.default();
  },
  methods: {
    editPost() {
      this.$emit("editPost", this.post);
    },
    deletePost() {
      this.$emit("deletePost", this.post._id);
    },
    default(triggerSelector = ".dropdown-toggle") {
      document.body.addEventListener("click", e => {
        if (!e.target.closest(triggerSelector)) {
          this.hidden = true;
        }
      });
    },
    toggle() {
      this.self = this.islogin;
      // console.log(this);
      // console.log(this.post.userId);
      // console.log(this.pud);
      // console.log(this.userId);
      // console.log(this.post.userId == this.userId);
      // console.log(this.self);
      // console.log(this.islogin);
      // console.log(this.hidden);
      this.hidden = !this.hidden;
      this.hasAnyoneShow = true;
      // const dropdown = document.querySelector(dropdownSelector);
      // const trigger = document.querySelector(triggerSelector);
    },
    cut(string) {
      return string.length > +5 ? string.substr(0, 5) + "..." : string;
    }
  }
};
</script>

<style lang="scss" scoped>
#dropdown {
  position: relative;
}
.dropdown-toggle {
  background: transparent;
  border: none;
  outline: none;
  width: 40px;
  box-shadow: none;
  height: 20px;
  padding: 0;
  padding-left: 1em;
  &:hover {
    box-shadow: none;
    span {
      border-color: turquoise;
    }
  }
  span {
    display: block;
    width: 10px;
    height: 10px;
    border: #666 solid;
    border-width: 1px 1px 0 0;
    transform: rotate(135deg);
    margin-bottom: 10px;
  }
}
.dropdown-menu {
  position: absolute;
  top: 16px;
  left: -55px;
  z-index: 1000;
  // display: none;
  float: left;
  min-width: 2rem;
  max-width: 8rem;
  padding: 0.2rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  // background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
[hidden] {
  display: none !important;
}
.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;

  &:hover,
  &:focus {
    color: #16181b;
    text-decoration: none;
    background-color: #f8f9fa;
  }

  &.active,
  &:active {
    color: #fff;
    text-decoration: none;
    background-color: #007bff;
  }
}
</style>