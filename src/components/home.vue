<template>
  <div id="home">
    <!-- navbar -->
    <van-nav-bar title="首页"></van-nav-bar>
    <!-- swipter -->
    <van-swipe :autoplay="3000" class="swiperImg">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- category -->
    <van-row class="m_bottom">
      <van-grid :column-num="5">
        <van-grid-item v-for="value in 10" :key="value" icon="photo-o" text="文字" />
      </van-grid>
    </van-row>
    <!-- 通知 -->
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">通知内容</van-notice-bar>
    <!-- category_detail -->
    <van-row>
      <van-list>
        <van-panel>
          <div slot="header" class="pannel-head">
            <van-col span="6">职工之家</van-col>
            <van-col offset="14" span="4">更多</van-col>
          </div>
          <div slot="default" class="pannel-default">
            <van-col offset="1" span="13" class="title">警惕！电动车祸患不可小觑1111111111111</van-col>
            <van-col span="10">
              <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt height="50px" />
            </van-col>
          </div>
          <div slot="footer" class="pannel-foot">
            <van-col span="10">2019.11.5</van-col>
          </div>
        </van-panel>
      </van-list>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  },
  methods: {
    getHome() {}
  }
};
</script>
<style  scoped>
.m_bottom {
  margin-bottom: 1rem;
}
.swiperImg {
  height: 10rem;
   background: #fff;
}
.swiperImg img {
  height: 100%;
}
.pannel-head {
  height: 2rem;
  display: flex;
  align-items: center;
}
.pannel-default {
  height: 5rem;
}
.pannel-default > .title {
  text-align: left;
}
.pannel-foot {
  height: 2rem;
  text-align: left;
}
</style>