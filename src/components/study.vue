<template>
  <div id="study">
    <!-- navbar -->
    <van-nav-bar title="学习中心" right-text="我的" @click-right="onClickRight"></van-nav-bar>
    <!-- swipter -->
    <van-swipe :autoplay="3000" class="swiperImg">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- list -->
    <van-grid :column-num="2">
      <van-grid-item to="/studyDetail">
        <van-panel>
          <div slot="default">
            <van-image
              fit="contain"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="default-title">中国共产党章程</div>
          </div>
          <div slot="footer">
            <van-col span="10">2019.11.5</van-col>
          </div>
        </van-panel>
      </van-grid-item>
      <van-grid-item>
        <van-panel>
          <div slot="default">
            <van-image
              fit="contain"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="default-title">中国共产党章程</div>
          </div>
          <div slot="footer">
            <van-col span="10">2019.11.5</van-col>
          </div>
        </van-panel>
      </van-grid-item>
    </van-grid>
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
  methods:{
    onClickRight(){
       this.$router.push({ path:'/my'  })
    }
  }
};
</script>
<style scoped>
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
.default-title{
  text-align: left
}
</style>