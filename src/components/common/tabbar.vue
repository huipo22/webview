<template>
  <div id="tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" name="home" @click="home()">首页</van-tabbar-item>
      <van-tabbar-item icon="search" name="study" @click="study()">学习</van-tabbar-item>
      <van-tabbar-item icon="coupon-o" name="love" @click="love()">服务站</van-tabbar-item>
      <van-tabbar-item icon="friends-o" name="questionAll" @click="questionAll">问答广场</van-tabbar-item>
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
  mounted() {
    this.active = this.$props.name;
  },
  methods: {
    home() {
      this.$router.push(
        "/home?token=" + JSON.parse(sessionStorage.getItem("userInfo")).token
      );
    },
    study() {
      this.$router.push("/study");
    },
    love() {
      this.$router.push("/love");
    },
    questionAll() {
      this.$router.push("/questionAll");
    },
    person() {
      this.$router.push("/person");
    }
  }
};
</script>
<style scoped>
/* .van-tabbar{
  background:#1989fa
}
.van-tabbar-item{
  color: #fff;
} */
</style>