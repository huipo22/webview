<template>
  <div id="love">
    <!-- navbar -->
    <van-nav-bar title="服务站"></van-nav-bar>
    <div class="shop" @click="shop">附近商家</div>
    <div class="shop" @click="zhaoshang">招商加盟</div>
    <div class="shop">
      <baidu-map class="map" center="北京">
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
      </baidu-map>
    </div>
  </div>
</template>
<script>
export default {
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
#love {
  padding: 10px 16px;
}
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