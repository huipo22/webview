<template>
  <div id="love">
    <!-- navbar -->
    <van-nav-bar title="服务站"></van-nav-bar>
    <div class="love pageSetting">
      <div class="shop" @click="shop">附近商家</div>
      <div class="shop" @click="zhaoshang">招商加盟</div>
      <div class="shop">
        <baidu-map class="map" :center="center" @ready="handler" :zoom="zoom" ak>
          <bm-marker
            v-for="marker in markers"
            :key="marker.id"
            :position="marker.geo"
            @click="handleMarkerClick(marker)"
          ></bm-marker>
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
      initLocation: false,
      center: {
        lng: 0,
        lat: 0
      },
      zoom: 13,
      markers: [
        {
          geo: { lng: 111.00685365, lat: 35.03885948 }
        },
        {
          geo: { lng: 116.433877, lat: 39.909622 }
        }
      ]
    };
  },
  mounted() {},
  methods: {
    handler({ BMap, map }) {
      let _this = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          console.log(r.address.city);
          _this.center = { lng: r.longitude, lat: r.latitude }; // 设置center属性值
          _this.autoLocationPoint = { lng: r.longitude, lat: r.latitude }; // 自定义覆盖物
          _this.initLocation = true;
          console.log("center:", _this.center); // 如果这里直接使用this是不行的
        },
        { enableHighAccuracy: true }
      );
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
</style>