<template>
  <div id="shop">
    <!-- navbar -->
    <van-nav-bar title="附近商家" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 筛选框 -->
    <van-search placeholder="请输入关键词搜索商家" v-model="searchVal" @search="onSearch" />
    <!-- <van-dropdown-menu>
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
    </van-dropdown-menu>-->
    <!-- list -->
    <!-- <van-row v-for="good in goodList" :key="good.id">
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
    </van-row>-->
    <!-- g更改过后 -->
    <van-row v-for="good in goodList" :key="good.shop_id">
      <van-card :thumb="resourse+good.head_photo" @click="shopDetail(good.shop_id)">
        <div slot="tags" class="tags">
          <van-row>
            <van-col span="24" class="comon" style="font-weight: bold;font-size:16px">{{good.user_login}}</van-col>
          </van-row>
          <van-row>
            <van-col span="24" class="comon" style="height:auto;padding: 0.5rem 0 0.5rem 1.2rem;">
              <van-tag
                v-for="(tagItem,index) in good.label"
                :key="index"
                class="tagView"
                round
                type="success"
                :color="index%2==0?'':''"
              >{{tagItem}}</van-tag>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="12" class="left priceBox">类型:{{good.name}}</van-col>
            <van-col span="12" class="right van-ellipsis">地址:{{good.user_address}}</van-col>
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
import { parse } from "path";
export default {
  data() {
    return {
      goodList: [],
      searchVal: "",
      resourse: global.imgAddress,
      type1Value: 0,
      type2Value: null,
      type3Value: 1,
      type1: [{ text: "商家类型", value: 0 }],
      option2: [
        { text: "预定价格", value: null },
        { text: "价格从高到低", value: 3 },
        { text: "价格从低到高", value: 4 }
      ],
      option3: [{ text: "默认排序", value: 1 }, { text: "销量", value: 5 }]
    };
  },
  mounted() {
    let shopId = this.$route.query.shopId;
    let searchVal = this.searchVal;
    this.getDefault(shopId, searchVal);
    // this.getType();
    // this.getGoods(Number(shopId), 1);
    // this.getGoods(0, 1);
    // this.type1Value = Number(shopId);
  },
  methods: {
    // 获取默认
    getDefault(shopId, searchVal) {
      let that = this;
      let params = this.qs.stringify({
        category_id: shopId,
        city: sessionStorage.getItem("city"),
        search: searchVal
      });
      this.axios
        .post("/goods/goods/get_goods", params, {
          headers: {
            "Device-Type": global.deviceType,
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(sessionStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
            that.goodList = res.data.data.list;
          }
        });
    },
    // 搜索
    onSearch() {
      let shopId = this.$route.query.shopId;
      let searchVal = this.searchVal;
      this.getDefault(shopId, searchVal);
    },
    // 类型
    getType() {
      let that = this;
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
            let result = res.data.data;
            for (let i in result) {
              let obj = {};
              obj.text = result[i].name;
              obj.value = result[i].id;
              that.type1.push(obj);
            }
          }
        });
    },
    // 商品列表
    getGoods(val, orderType) {
      let that = this;
      let params = this.qs.stringify({
        category_id: val,
        city: sessionStorage.getItem("city"),
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
  /* height: 2rem; */
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
.tagView {
  margin: 0 5px;
}

</style>