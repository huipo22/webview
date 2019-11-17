<template>
  <div id="shopDetail">
    <!-- navbar -->
    <van-nav-bar title="商家详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- swipter -->
    <van-swipe :autoplay="3000" class="swiperImg">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- detail -->
    <van-row>
      <van-col>商品名称</van-col>
    </van-row>
    <van-row>
      <van-col>价格</van-col>
      <van-col>销量</van-col>
      <van-col>库存</van-col>
    </van-row>
    <van-row>
      <van-col>商品详情</van-col>
    </van-row>
    <van-row class="btnBox">
      <van-button
        size="small"
        round
        style="width:100%"
        color="#1989fa"
        type="primary"
        @click="submit"
      >立即预定</van-button>
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
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>