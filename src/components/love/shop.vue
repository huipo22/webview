<template>
  <div id="shop">
    <!-- navbar -->
    <van-nav-bar title="附近商家" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 筛选框 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>
    <!-- list -->
    <van-card thumb="https://img.yzcdn.cn/vant/t-thirt.jpg" @click="shopDetail">
      <div slot="tags" class="tags">
        <van-row>
          <van-col span="24" class="comon">名字</van-col>
        </van-row>
        <van-row>
          <van-col span="12" class="comon">类型</van-col>
          <van-col span="12" class="comon">库存</van-col>
        </van-row>
        <van-row>
          <van-col span="12" class="left priceBox">价格</van-col>
          <van-col span="12" class="right">
            <van-button size="small" round color="#1989fa" type="primary">预定:2</van-button>
          </van-col>
        </van-row>
      </div>
    </van-card>
  </div>
</template>
<script>
// import BMap from 'BMap'
export default {
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: "A",
      option1: [
        { text: "商家类型", value: 0 },
        { text: "etc", value: 1 },
        { text: "酒店", value: 2 },
        { text: "加油", value: 3 },
        { text: "维修", value: 4 }
      ],
      option2: [
        { text: "价格", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ],
      option3: [
        { text: "销量", value: "A" },
        { text: "好评排序", value: "B" },
        { text: "销量排序", value: "C" }
      ]
    };
  },
  mounted() {
    this.city();
  },
  methods: {
    city() {
      const _this=this
      const geolocation = new BMap.Geolocation();
      window.console.log(geolocation);
      geolocation.getCurrentPosition(
        function getinfo(position) {
          let city = position.address.city; //获取城市信息
          let province = position.address.province; //获取省份信息
          _this.LocationCity = city;
        },
        function(e) {
          _this.LocationCity = "定位失败";
        },
        { provider: "baidu" }
      );
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    shopDetail() {
      this.$router.push("/love/shopDetail");
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