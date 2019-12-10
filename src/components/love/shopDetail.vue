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
      <van-col span="24" class="center" style="font-weight:bold">{{goodDetail.user_login}}</van-col>
    </van-row>
    <van-row class="pageSetting">
      <!-- <van-col span="12" class="left title">
        总价:
        <span class="color">{{goodDetail.original_price}}元</span>
      </van-col>
      <van-col span="8" offset="4" class="left title">
        会员价:
        <span class="color">{{goodDetail.member_price}}元</span>
      </van-col>
      <van-col span="12" class="left title">库存:{{goodDetail.goods_num}}</van-col>
      <van-col span="8" offset="4" class="left title">销量:{{goodDetail.goods_volume}}</van-col>-->
      <van-col span="24" class="left title">
        亮点：
        <van-tag
          v-for="(tagItem,index) in goodDetail.label.split(',')"
          :key="index"
          class="tagView"
          round
          type="success"
          :color="index%2==0?'':''"
        >{{tagItem}}</van-tag>
      </van-col>
      <van-col span="24" class="left title van-ellipsis">地址：{{goodDetail.address}}</van-col>

      <van-col
        span="24"
        class="left title"
        @click="sendInfoToJavatel(goodDetail.user_phone)"
      >电话：{{goodDetail.user_phone}}</van-col>

      <van-col span="24">
        <van-divider>商品列表</van-divider>
      </van-col>
    </van-row>
    <van-row v-for="good in goodDetail.goods_list" :key="good.shop_id">
      <van-card
        :thumb="resourse+good.goods_img"
        @click="shopDetail(good.shop_id)"
        style="background:#fff"
      >
        <div slot="tags" class="tags">
          <van-row class="hh">
            <van-col span="24" class="comon" style="font-weight: bold;">{{good.goods_name}}</van-col>
          </van-row>
          <van-row></van-row>
          <van-row class="hh">
            <van-col span="12" class="left priceBox">剩余:{{good.goods_num}}{{good.goods_spec}}</van-col>
            <van-col span="12" class="right">原价: <span style="text-decoration:line-through;color:red">{{good.original_price}}</span> 元</van-col>
          </van-row>
          <van-row class="hh">
            <van-col span="12" class="left priceBox">销量:{{good.goods_volume}}</van-col>
            <van-col span="12" class="right">
              <van-button
                size="small"
                color="#1989fa"
                round
                type="primary"
                @click="sendInfoToJavas(good)"
                :disabled="good.goods_num==0?true:false"
              >预定:{{good.member_price}}元</van-button>
            </van-col>
          </van-row>
        </div>
      </van-card>
    </van-row>
    <!-- <van-row class="detail" v-html="goodDetail.goods_detail"></van-row> -->
    <!-- new -->
    <van-row class="pageSetting">
      <van-col span="24">
        <van-divider>商家介绍</van-divider>
      </van-col>
    </van-row>
    <van-row class="detail" v-html="goodDetail.content"></van-row>
    <van-row class="flo">
      <van-col span="8" class="left">
        <!-- <van-icon name="location-o" color="blue" size="20px"/> -->
      </van-col>
    </van-row>
    <van-row class="plusBox">
      <van-col span="24">
        <van-button
          size="normal"
          style="width:100%; margin-right:10px;"
          color="#1989fa"
          type="primary"
          @click="sendInfoToJava(goodDetail.address)"
        >路线导航</van-button>

        <!-- <van-button
          size="normal"
          style="width:45%"
          color="#1989fa"
          type="primary"
          @click="sendInfoToJavas(goodDetail)"
        >立即支付:{{goodDetail.member_price}}元</van-button>-->
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
      //   goods_id: goodId
      shop_id: goodId
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
    sendInfoToJava(address) {
      var name = address;
      // alert(address);
      window.AndroidWebView.showInfoFromJs(name);
    },
    showInfoFromJava(mes) {
      alert("来自客户端的信息：" + msg);
    },
    sendInfoToJavas(item) {
      var name =
        "0" +
        "," +
        item.id +
        "," +
        item.present_price +
        "," +
        item.goods_num +
        "," +
        item.member_price +
        ",0";

      // alert(name)
      window.AndroidWebViews.showInfoFromJss(name);
    },
    showInfoFromJavas(msg) {
      // alert("来自客户端的信息："+msg);
    },
    sendInfoToJavatel(mobile) {
      var name = mobile;
      window.AndroidWebViewtel.showInfoFromJstel(name);
    },
    showInfoFromJavatel(msg) {
      //alert("来自客户端的信息："+msg);
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
.tagView {
  margin: 0 5px;
}
.tags {
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hh {
  height: 1.5rem;
}
</style>