<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" name="home" @click="home()">首页</van-tabbar-item>
      <van-tabbar-item icon="search" name="study" @click="study()">学习</van-tabbar-item>
      <van-tabbar-item icon="friends-o" name="love" @click="love()">爱心服务站</van-tabbar-item>
      <van-tabbar-item icon="user-o" name="person" @click="person()">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      active: "home"
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    study() {
      this.$router.push("/study");
    },
    love() {
      this.$router.push("/love");
    },
    person() {
      this.$router.push("/person");
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
  /* margin-top: 60px; */
  background: #f8f8f8;
}
</style>
