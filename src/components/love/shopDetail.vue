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

      <van-col
        v-if="goodDetail.shop_info"
        span="24"
        class="left title"
        @click="sendInfoToJavatel(goodDetail.shop_info.user_phone)"
      >电话:{{goodDetail.shop_info.user_phone}}</van-col>

      <van-col span="24">
        <van-divider>商品详情</van-divider>
      </van-col>
    </van-row>
    <van-row class="detail" v-html="goodDetail.goods_detail"></van-row>
    <van-row class="flo">
      <van-col span="8" class="left">
        <!-- <van-icon name="location-o" color="blue" size="20px"/> -->
      </van-col>
      <van-col offset="8" span="8" class="right" style="display:none">
        <van-button
          size="small"
          style="width:60%"
          color="#1989fa"
          type="primary"
          @click="sendInfoToJavatel(goodDetail.shop_info.user_phone)"
        >拨打电话</van-button>
      </van-col>
    </van-row>
    <van-row class="plusBox">
      <van-col span="24">
        <van-button
          size="normal"
          style="width:45%; margin-right:10px;"
          color="#1989fa"
          type="primary"
          @click="sendInfoToJava(goodDetail.shop_info.user_address+goodDetail.goods_name)"
        >路线导航</van-button>

        <van-button
          size="normal"
          style="width:45%"
          color="#1989fa"
          type="primary"
          @click="sendInfoToJavas(goodDetail)"
        >立即支付:{{goodDetail.member_price}}元</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import global from "../../global";
import { Dialog, Toast } from "vant";
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
    // submit(id) {},
    sendInfoToJava(address) {
      // alert(address);
      var name = address;
      window.AndroidWebView.showInfoFromJs(name);

      //window.location.href =
      //    "http://api.map.baidu.com/geocoder?address=" +
      //    address +
      //    "&output=html&src=webapp.baidu.openAPIdemo";
    },
    showInfoFromJava(mes) {
      alert("来自客户端的信息：" + msg);
    },
    // phoneCall(mobile) {
    //   // Notify({ type: "success", message: "手机号:" + mobile });
    //   //  Dialog.alert({
    //   //   message: "手机号:"+mobile
    //   // }).then(() => {
    //   //   // on close
    //   // });
    //   window.location.href = "tel://" + mobile;
    // },
    // sendInfoToJava() {
    //   //这个市导航
    //   var name = document.getElementById("name_input").value;
    //   window.AndroidWebView.showInfoFromJs(name);
    // },

    //在android代码中调用此方法
    showInfoFromJava(msg) {
      // alert("来自客户端的信息："+msg);
    },
    sendInfoToJavas(item) {
      const name =
        0 +
        "," +
        item.id +
        "," +
        item.present_price +
        "," +
        item.goods_num +
        "," +
        item.member_price +
        "," +
        0;
      //   console.log(name);
      //这个市支付
      //   var name = document.getElementById("name_inputs").value;
      window.AndroidWebViews.showInfoFromJss(name);
    },
    sendInfoToJavatel(mobile) {
      //这个市拨打电话
      //   alert(mobile);
      //   var name = document.getElementById("name_inputtel").value;
      window.AndroidWebViewtel.showInfoFromJstel(mobile);
    },
    //在android代码中调用此方法
    showInfoFromJavatel(msg) {
      //alert("来自客户端的信息："+msg);
    }
  }
};
</script>


<!--<input id="name_input" class="inputStyle" type="text" value="39.017972,117.667077" />
<a class="rect" onclick="sendInfoToJava()">JS调用Java</a>-->





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