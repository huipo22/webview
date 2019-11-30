<template>
  <div id="love" v-cloak>
    <!-- navbar -->
    <van-nav-bar title="爱心服务站" style="background: #1989fa;"></van-nav-bar>
    <!-- 遮罩 -->
    <van-overlay :show="!flag">
      <div class="wrapper">
        <van-loading color="#1989fa" vertical>加载中...</van-loading>
      </div>
    </van-overlay>
    <!-- 栏目1 -->
    <van-divider>为你推荐</van-divider>
    <div class="love">
      <div class="gridBox">
        <van-grid :border="false" :column-num="5" class="firstBox">
          <van-grid-item
            v-for="item in tagList.slice(0,5)"
            :key="item.id"
            @click="shop(item.id)"
            :icon="resourse+item.img"
            :text="item.name"
          >
            <!-- <van-image :src="resourse+item.img" />
            <div class="itemName">{{item.name}}</div>-->
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 栏目2 -->
      <van-divider>全部服务</van-divider>
      <div class="love">
        <div class="gridBox2">
          <van-grid :border="false" :column-num="2" :center="false">
            <van-grid-item v-for="item in tagList" :key="item.id" @click="shop(item.id)">
              <div class="secondBox" slot="default">
                <div class="imgicon">
                  <van-image :src="resourse+item.img" />
                </div>
                <div class="desc">
                  <div class="itemName">{{item.name}}</div>
                  <div class="itemName2">{{item.description}}</div>
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <van-divider>工会地图</van-divider>
      <div class="shop pageSetting">
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
import global from "../global";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      tagList: [],
      resourse: global.imgAddress,
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
    this.getType();
    if (this.flag == false) {
    }
  },
  methods: {
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
            that.tagList = res.data.data;
          }
        });
    },
    handler({ BMap, map }) {
      let _this = this;
      var geolocation = new BMap.Geolocation();
      window.console.log(geolocation);
      geolocation.enableSDKLocation();
      geolocation.getCurrentPosition(
        function(r) {
          window.console.log(r);
          sessionStorage.setItem("city", r.address.city);
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
    shop(id) {
      this.$router.push("/love/shop?shopId=" + id);
    }
    // zhaoshang() {
    //   this.$router.push("/love/zhaoshang");
    // }
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
  height: 13rem;
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
.gridBox {
  width: 100%;
  height: 100%;
  display: flex;
  /* background: #f0f3f6; */
  /* padding: 10px 0; */
  box-sizing: border-box;
  justify-content: center;
}
.van-image {
  /* height: 50px !important; */
  width: 50px;
}
.desc {
  display: flex;
  flex-direction: column;
  padding-left: 8px;
}
.itemName {
  /* font-weight: bold;
  padding-top: 8px; */
  font-size: 14px;
  text-align: left;
}
.itemName2 {
  font-size: 12px;
  color: #bbb9b9;
  text-align: left;
}
.pageSetting {
  padding: 10px;
}
.firstBox {
  width: 85% !important;
}
.gridBox2 {
  padding: 0 6px;
}
.secondBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.van-nav-bar__title {
  color: #fff;
}
</style>