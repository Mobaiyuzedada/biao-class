<template lang="pug">
  div
    el-row
      el-col(:span="8")
        el-radio(v-model="radio" label="1") 备选项
        el-radio(v-model="radio" label="2") 备选项
      el-col(:span="8")
        el-radio-group(@change="log" v-model="radio")
          el-radio(label="male") 男
          el-radio(label="female") 女
        el-input(v-model="input" suffix-icon="el-icon-date"  clearable )
        div {{input}}
        div lorem
      el-col(:span="8")
        el-select(v-model="input" multiple filterable remote reserve-keyword placeholder="请输入关键词" )
          el-option(v-for="user in userList" :key="user.id" :label="user.name" :value="user.id")
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  mounted() {},
  data() {
    return {
      radio: null,
      input: "dry",
      userList:[
        {id:1,name:'dry1'},
        {id:2,name:'dry2'},
        {id:3,name:'dry3'},
        {id:4,name:'dry4'},
        {id:5,name:'dry5'},
        {id:6,name:'dry6'},
        {id:7,name:'dry7'},
        {id:8,name:'dry8'},
        {id:9,name:'dry9'},

      ]
    };
  },
  methods: {
    log(value) {
      console.log(value);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
