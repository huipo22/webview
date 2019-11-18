<template>
  <div id="love">
    <!-- navbar -->
    <van-nav-bar title="服务站"></van-nav-bar>
    <div class="love pageSetting">
      <div class="shop" @click="shop">附近商家</div>
      <div class="shop" @click="zhaoshang">招商加盟</div>
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
            :locationIcon="{url: require('../../svg/location.svg'), size: {width: 18, height: 18}}"
            :autoLocation="true"
          ></bm-geolocation>
          <!-- 自定义定位图标覆盖物 -->
          <bm-marker
            :position="autoLocationPoint"
            :locationIcon="{url: require('../../svg/location.svg'), size: {width: 18, height: 18}}"
            v-if="initLocation"
          ></bm-marker>
          <bm-marker v-for="marker in markers" :key="marker.id" :position="marker.geo"></bm-marker>
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
      autoLocationPoint: { lng: 37.8797440229, lat: 112.5690773859 },
      initLocation: false,
      center: {
        lng: 37.8797440229,
        lat: 112.5690773859
      },
      zoom: 25,
      markers: [
        {
          geo: { lng: 37.8797440229, lat: 112.5690773859 }
        },
        {
          geo: { lng: 37.879744321, lat: 112.5690773859 }
        },
      ]
    };
  },
  mounted() {},
  methods: {
    handler({ BMap, map }) {
      let _this = this;
      var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(
      //   function(r) {
      //     console.log(r);
      //     sessionStorage.setItem("city", r.address.city);
      //     _this.center = { lng: r.longitude, lat: r.latitude }; // 设置center属性值
      //     _this.autoLocationPoint = { lng: r.longitude, lat: r.latitude }; // 自定义覆盖物
      //     _this.initLocation = true;
      //     console.log("center:", _this.center); // 如果这里直接使用this是不行的
      //   },
      //   { enableHighAccuracy: true }
      // );
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
.shop {
  height: 14rem;
  align-items: center;
  display: flex;
  justify-content: center;
  border: 1px solid;
  margin-bottom: 0.5rem;
}
.shop:last-child {
  margin-bottom: 50px;
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
</style>