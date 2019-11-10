<template>
  <div id="love">
    <!-- navbar -->
    <van-nav-bar title="服务站"></van-nav-bar>
    <div class="love pageSetting">
      <div class="shop" @click="shop">附近商家</div>
      <div class="shop" @click="zhaoshang">招商加盟</div>
      <div class="shop">
        <!-- <baidu-map class="map" center="北京">
          <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :autoLocation="true"
          ></bm-geolocation>
        </baidu-map>-->
        <baidu-map class="map" :center="map.center" :zoom="map.zoom" ak>
          <bm-marker
            v-for="marker in markers"
            :key="marker.id"
            :position="marker.geo"
            @click="handleMarkerClick(marker)"
          ></bm-marker>
        </baidu-map>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: {
        center: {
          lng: 116.404,
          lat: 39.915
        },
        zoom: 15
      },
      markers: [
        {
          geo: { lng:  116.449112, lat: 39.920912 }
        },
        {
          geo: { lng: 116.433877,lat: 39.909622 }
        },
       
      ]
    };
  },
  mounted() {},
  methods: {
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
.map {
  width: 100%;
  height: 100%;
}
</style>