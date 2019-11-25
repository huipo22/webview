<template>
  <div id="love" v-cloak>
    <!-- navbar -->
    <van-nav-bar title="服务站"></van-nav-bar>

    <van-overlay :show="!flag">
      <div class="wrapper">
        <van-loading color="#1989fa" vertical>加载中...</van-loading>
      </div>
    </van-overlay>
    <div class="love pageSetting">
      <div class="shop" @click="shop">
        <img src="../assets/shop.jpg" alt />
      </div>
      <div class="shop" @click="zhaoshang">
        <img src="../assets/zhaosehng.jpg" alt />
      </div>
      <div class="shop">
        <baidu-map
          class="map"
          :center="center"
          @ready="handler"
          :zoom="zoom"
          ak:scroll-wheel-zoom="true"
        >
          <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :autoLocation="true"
          ></bm-geolocation>
          <bm-marker :position="center"></bm-marker>
          <bm-marker v-for="marker in markers" :key="marker.id" :position="marker"></bm-marker>
        </baidu-map>
      </div>
    </div>
    <tabbar name="love" />
  </div>
</template>
<script>
import tabbar from "../components/common/tabbar";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      flag: false,
      center: {
        lng: 0,
        lat: 0
      },
      zoom: 25,
      markers: []
    };
  },
  mounted() {
    this.getLocation();
    if (this.flag == false) {
    }
  },
  methods: {
    handler({ BMap, map }) {
      let _this = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          window.console.log(r);
          localStorage.setItem("city", r.address.city);
          _this.flag = true;
          _this.center = { lng: r.longitude, lat: r.latitude }; // 设置center属性值
        },
        { enableHighAccuracy: true }
      );
    },
    getLocation() {
      let that = this;
      this.axios.get("/home/index/get_location").then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          for (let index of res.data.data) {
            var geo = {};
            geo.lng = index.y;
            geo.lat = index.x;
            that.markers.push(geo);
          }
        }
      });
    },
    shop() {
      this.$router.push("/love/shop");
    },
    zhaoshang() {
      this.$router.push("/love/zhaoshang");
    }
  }
};
</script>
<style scoped>
.van-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
}
.shop {
  height: 10rem;
  align-items: center;
  display: flex;
  justify-content: center;
  /* border: 1px solid; */
  margin-bottom: 1rem;
}
.shop:last-child {
  height: 14rem;
  margin-bottom: 50px;
}
.shop > img {
  width: 100%;
}
.map,
.BMap_mask {
  width: 100%;
  height: 100%;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none !important;
}
/* <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :locationIcon="{url: require('../../svg/location.svg'), size: {width: 18, height: 18}}"
            :autoLocation="true"
          ></bm-geolocation>
          <!-- 自定义定位图标覆盖物 -->
          <bm-marker
            :position="autoLocationPoint"
            :locationIcon="{url: require('../../svg/location.svg'), size: {width: 18, height: 18}}"
            v-if="initLocation"
          ></bm-marker> */
</style>