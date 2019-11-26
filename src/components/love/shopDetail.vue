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
    <van-row class="pageSetting">
      <van-col span="24" class="left" style="font-weight:bold">商品名称:{{goodDetail.goods_name}}</van-col>
    </van-row>
    <van-row class="pageSetting">
      <van-col span="12" class="left title">
        总价:
        <span class="color">{{goodDetail.original_price}}元</span>
      </van-col>
      <van-col span="8" offset="4" class="left title">
        预定:
        <span class="color">{{goodDetail.goods_num}}元</span>
      </van-col>
      <van-col span="12" class="left title">库存:{{goodDetail.goods_num}}</van-col>
      <van-col span="8" offset="4" class="left title">销量:{{goodDetail.goods_volume}}</van-col>
      <van-col
        v-if="goodDetail.shop_info"
        span="24"
        class="left title"
      >地址:{{goodDetail.shop_info.province}}{{goodDetail.shop_info.city}}{{goodDetail.shop_info.county}}{{goodDetail.shop_info.user_address}}</van-col>
      <van-col span="24">
        <van-divider>商品详情</van-divider>
      </van-col>
    </van-row>
    <van-row class="detail" v-html="goodDetail.goods_detail"></van-row>
    <van-row class="flo">
      <van-col span="8" class="left">
        <!-- <van-icon name="location-o" color="blue" size="20px"/> -->
        <van-button
          size="small"
          style="width:60%"
          color="#1989fa"
          type="primary"
          @click="nav(goodDetail.shop_info.user_address)"
        >查看路线</van-button>
      </van-col>
      <van-col offset="8" span="8" class="right">
        <van-button
          size="small"
          style="width:60%"
          color="#1989fa"
          type="primary"
          @click="phoneCall()"
        >拨打电话</van-button>
      </van-col>
    </van-row>
    <van-row class="plusBox">
      <van-col span="24">
        <van-button
          size="small"
          style="width:100%"
          color="#1989fa"
          type="primary"
          @click="submit(goodDetail.id)"
        >立即预定:{{goodDetail.goods_num}}</van-button>
      </van-col>
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
    },
    submit(id) {
      
    },
    nav(address) {
      window.location.href =
        "http://api.map.baidu.com/geocoder?address=" +
        address +
        "&output=html&src=webapp.baidu.openAPIdemo";
    },
    phoneCall(mobile) {
      window.location.href = "tel://13279200101";
    }
  }
};
</script>
<style scoped>
.detail {
  width: 100%;
  overflow: hidden;
}
.detail >>> img {
  width: 100%;
}
.van-divider {
  margin: 16px 0 0 16px;
}
.plusBox {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  z-index: 999;
}
.flo {
  width: 100%;
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -60%);
}
.color {
  color: red;
}
</style>