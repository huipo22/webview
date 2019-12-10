<template>
  <div id="order">
    <!-- navbar -->
    <van-nav-bar title="订单列表" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active" color="#1989fa">
      <van-tab title="已支付">
        <van-card
          
          class="tabBox"
          v-for="item in OrderList"
          :key="item.id"
        >
          <div slot="title" class="left hei fon" v-html="item.goods_info[0].goods_name"></div>
          <div slot="tags">
            <van-row class="hei">
              <van-col span="16" class="left">支付时间:{{item.goods_info[0].add_time| dCreateTimer}}</van-col>
              <van-col span="8" class="right">
                支付价格:
                <span class="color">{{item.pay_price}}</span>
              </van-col>
            </van-row>
             <van-row class="hei">
              <van-col span="16" class="left">订单号:{{item.order_number}}</van-col>
              <van-col span="8" class="right">
                <van-tag type="danger">未确认</van-tag>
              </van-col>
            </van-row>
            <!-- <van-row class="hei">
              <van-col span="12" class="left">
                <van-button
                  size="small"
                  style="width:60%"
                  color="#1989fa"
                  type="primary"
                  @click="nav(item.shop_info.user_address)"
                >查看路线</van-button>
              </van-col>
              <van-col span="12" class="right">
                <van-button
                  size="small"
                  style="width:60%"
                  color="#1989fa"
                  type="primary"
                  @click="phoneCall(item.shop_info.mobile)"
                >拨打电话</van-button>
              </van-col>
            </van-row> -->
          </div>
          <div slot="footer"></div>
        </van-card>
      </van-tab>
      <van-tab title="已完成">
        <van-card
          class="tabBox"
          v-for="item in OrderListOver"
          :key="item.id"
        >
          <div slot="title" class="left hei fon" v-html="item.goods_info[0].goods_name"></div>
          <div slot="tags">
            <van-row class="hei">
              <van-col span="16" class="left">完成时间:{{item.goods_info[0].add_time| dCreateTimer}}</van-col>
              <van-col span="8" class="right">
                支付价格:
                <span class="color">{{item.pay_price}}</span>
              </van-col>
            </van-row>
            <van-row class="hei">
              <van-col span="16" class="left">订单号:{{item.order_number}}</van-col>
              <van-col span="8" class="right">
                <van-tag type="danger">已确认</van-tag>
              </van-col>
            </van-row>
            <!-- <van-row class="hei">
              <van-col span="12" class="left">
                <van-button
                  size="small"
                  style="width:60%"
                  color="#1989fa"
                  type="primary"
                  @click="nav(item.shop_info.user_address)"
                >查看路线</van-button>
              </van-col>
              <van-col span="12" class="right">
                <van-button
                  size="small"
                  style="width:60%"
                  color="#1989fa"
                  type="primary"
                  @click="phoneCall(item.shop_info.mobile)"
                >查看电话</van-button>
              </van-col>
            </van-row> -->
          </div>
          <div slot="footer"></div>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import global from "../../global";
import { Dialog } from 'vant';
export default {
  data() {
    return {
      OrderList: null,
      resource: global.imgAddress,
      active: 2,
      OrderListOver: null
    };
  },
  mounted() {
    this.getData(2);
    this.getData2(3);
  },
  methods: {
    getData(type) {
      let params = this.qs.stringify({
        status: type
      });
      let that = this;
      this.axios
        .post("/goods/order/order_status", params, {
          headers: {
            "Device-Type": global.deviceType,
            token: JSON.parse(sessionStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
            that.OrderList = res.data.data;
          }
        });
    },
    getData2(type) {
      let params = this.qs.stringify({
        status: type
      });
      let that = this;
      this.axios
        .post("/goods/order/order_status", params, {
          headers: {
            "Device-Type": global.deviceType,
            token: JSON.parse(sessionStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
            that.OrderListOver = res.data.data;
          }
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    nav(address) {
      window.location.href =
        "http://api.map.baidu.com/geocoder?address=" +
        address +
        "&output=html&src=webapp.baidu.openAPIdemo";
    },
    phoneCall(mobile) {
      // Notify({ type: "success", message: "手机号:" + mobile });
      Dialog.alert({
        message: "手机号:"+mobile
      }).then(() => {
        // on close
      });

      // window.console.log(mobile)
      // window.location.href = "tel://" + mobile;
    }
  }
};
</script>
<style scoped>
.tabBox {
  background: #fff;
  border-bottom: 1px solid #f8f8f8;
}
.hei {
  height: 30px;
  display: flex;
  align-items: center;
}
.color {
  color: red;
}
.fon {
  font-size: 14px;
}
</style>