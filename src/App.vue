<template>
  <div id="app" class="bgcolor">
    <router-view></router-view>
    <!-- <van-tabbar v-model="active" v-if="flag">
      <van-tabbar-item icon="home-o" name="home" @click="home()">首页</van-tabbar-item>
      <van-tabbar-item icon="search" name="study" @click="study()">学习</van-tabbar-item>
      <van-tabbar-item icon="friends-o" name="love" @click="love()">服务站</van-tabbar-item>
      <van-tabbar-item icon="user-o" name="person" @click="person()">我</van-tabbar-item>
    </van-tabbar>-->
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      active: "person"
      // flag: null
    };
  },
  // beforeMount() {
  //   window.console.log(this);
  //   if (this.$route.fullPath == "/") {
  //     this.flag = false;
  //   }
  // },
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

<style>
html,
body,
#app {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  /* margin-top: 60px; */
  /* background: #f8f8f8; */
  background: #fff;
}
/* 公用样式 */
.pageSetting {
  padding: 10px 16px;
}
.h_titles {
  font-size: 12px;
  color: #7d7e80;
  text-align: left;
}
.h_content {
  font-size: 16px;
  /* color: #1989fa; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.m_bottom {
  margin-bottom: 0.5rem;
}
.swiperImg {
  height: 10rem;
  background: #fff;
}
.swiperImg img {
  width: 100%;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
.title {
  font-size: 14px;
}
.font_h1 {
  font-size: 1rem;
}
.bgcolor {
  background: #ecf0f3;
}
.bold {
  font-weight: bold;
}
</style>
