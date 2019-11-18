<template>
  <div id="shopDetail">
    <!-- navbar -->
    <van-nav-bar title="商家详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- swipter -->
    <van-swipe :autoplay="3000" class="swiperImg">
      <van-swipe-item v-for="(image, index) in goodDetail.banners" :key="index">
        <img :src="resourse+image.url" />
      </van-swipe-item>
    </van-swipe>
    <!-- detail -->
    <van-row>
      <van-col>商品名称:{{goodDetail.goods_name}}</van-col>
    </van-row>
    <van-row>
      <van-col>价格:{{goodDetail.original_price}}</van-col>
      <van-col>销量:{{goodDetail.goods_volume}}</van-col>
      <van-col>库存:{{goodDetail.goods_num}}</van-col>
    </van-row>
    <van-row>
      <van-col>商品详情</van-col>
    </van-row>
    <van-row class="detail" v-html="goodDetail.goods_detail"></van-row>
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
import global from "../../global";
export default {
  data() {
    return {
      goodDetail: {},
      resourse: global.imgAddress,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  },
  mounted() {
    let goodId = this.$route.query.goodId;
    let params = this.qs.stringify({
      goods_id: goodId
    });
    let that = this;
    this.axios
      .post("/goods/goods/goods_detail", params, {
        headers: {
          "Device-Type": global.deviceType,
          token: JSON.parse(sessionStorage.getItem("userInfo")).token
        }
      })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.goodDetail = res.data.data;
        }
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.detail{
  width: 100%;
  overflow: hidden;
}
.detail img{
  width: 100%;
}
</style>