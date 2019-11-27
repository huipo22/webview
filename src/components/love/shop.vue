<template>
  <div id="shop">
    <!-- navbar -->
    <van-nav-bar title="附近商家" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 筛选框 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="type1Value" :options="type1" @change="getGoods(type1Value,1)" />
      <van-dropdown-item
        v-model="type2Value"
        :options="option2"
        @change="getGoods(type1Value,type2Value)"
      />
      <van-dropdown-item
        v-model="type3Value"
        :options="option3"
        @change="getGoods(type1Value,type3Value)"
      />
    </van-dropdown-menu>
    <!-- list -->
    <van-row v-for="good in goodList" :key="good.id">
      <van-card :thumb="resourse+good.goods_img" @click="shopDetail(good.id)">
        <div slot="tags" class="tags">
          <van-row>
            <van-col span="24" class="comon">{{good.goods_name}}</van-col>
          </van-row>
          <van-row>
            <van-col span="12" class="comon">销量:{{good.goods_volume}}</van-col>
            <van-col span="12" class="comon">库存:{{good.goods_num}}</van-col>
          </van-row>
          <van-row>
            <van-col span="12" class="left priceBox">价格:{{good.original_price}}元</van-col>
            <van-col span="12" class="right">
              <van-button
                size="small"
                round
                color="#1989fa"
                type="primary"
              >预定价格:{{good.present_price}}元</van-button>
            </van-col>
          </van-row>
        </div>
      </van-card>
    </van-row>
  </div>
</template>
<script>
// import BMap from 'BMap'
import global from "../../global";
import { Toast } from "vant";
export default {
  data() {
    return {
      goodList: [],
      resourse: global.imgAddress,
      type1Value: 0,
      type2Value: null,
      type3Value: 1,
      type1: [
        { text: "商家类型", value: 0 },
        { text: "酒店", value: 62 },
        { text: "etc", value: 63 },
        { text: "加油", value: 64 },
        { text: "维修", value: 65 }
      ],
      option2: [
        { text: "预定价格", value: null },
        { text: "价格从高到低", value: 3 },
        { text: "价格从低到高", value: 4 }
      ],
      option3: [{ text: "默认排序", value: 1 }, { text: "销量", value: 5 }]
    };
  },
  mounted() {
    let shopId= this.$route.query.shopId;
    this.getType();
    this.getGoods(Number(shopId), 1);
    // this.getGoods(0, 1);
    this.type1Value=Number(shopId);
  },
  methods: {
    // 类型
    getType() {
      this.axios
        .get("/goods/goods/get_type", {
          headers: {
            "Device-Type": global.deviceType,
            token: JSON.parse(sessionStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
          }
        });
    },
    // 商品列表
    getGoods(val, orderType) {
      let that = this;
      let params = this.qs.stringify({
        category_id: val,
        city: sessionStorage.getItem('city'),
        order_type: orderType
      });

      this.axios
        .post("/goods/goods/get_goods", params, {
          headers: {
            "Device-Type": global.deviceType,
            token: JSON.parse(sessionStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
            that.goodList = res.data.data;
          } else {
            Toast.fail(res.data.msg);
          }
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    shopDetail(goodId) {
      this.$router.push("/love/shopDetail?goodId=" + goodId);
    }
  }
};
</script>
<style scoped >
.van-card {
  background: #fff;
}
.tags {
  height: 100%;
}
.tags .comon {
  height: 2rem;
  text-align: left;
  padding-left: 1.5rem;
}
.tags .left {
  text-align: left;
  padding-left: 1.5rem;
}
.priceBox {
  height: 20px;
  display: flex;
  align-items: center;
}
.van-button--small {
  min-width: 60px;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  line-height: 21px;
}
</style>