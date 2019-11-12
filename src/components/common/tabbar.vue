<template>
  <div id="tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" name="home" @click="home()">首页</van-tabbar-item>
      <van-tabbar-item icon="search" name="study" @click="study()">学习</van-tabbar-item>
      <van-tabbar-item icon="friends-o" name="love" @click="love()">服务站</van-tabbar-item>
      <van-tabbar-item icon="user-o" name="person" @click="person()">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  props: ["name"],
  data() {
    return {
      active: null
    };
  },
  mounted(){
    window.console.log(this)
    this.active=this.$props.name
  },
  methods: {
    home() {
      this.$router.push("/home");
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