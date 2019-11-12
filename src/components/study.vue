<template>
  <div id="study">
    <!-- navbar -->
    <van-nav-bar title="学习中心" right-text="我的" @click-right="onClickRight"></van-nav-bar>
    <!-- swipter -->
    <van-swipe :autoplay="3000" class="swiperImg">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- list -->
    <van-grid :column-num="2">
      <van-grid-item @click="studyDetail(item.id)" item.id v-for="item in study" :key="item.id">
        <van-panel>
          <div slot="default">
            <van-image fit="contain" :src="resource+item.img" />
            <div class="default-title">{{item.content}}</div>
          </div>
          <div slot="footer">
            <van-col span="10">{{item.add_time}}</van-col>
          </div>
        </van-panel>
      </van-grid-item>
    </van-grid>
    <tabbar name="study" />
  </div>
</template>
<script>
import tabbar from "../components/common/tabbar";
import global from '../global'
export default {
  components: {
    tabbar
  },
  mounted() {
    let that = this;
    this.axios
      .get("home/study", {
        headers: {
          "Device-Type": global.deviceType,
          token: JSON.parse(sessionStorage.getItem("userInfo")).token
        }
      })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.study = res.data.data;
        }
      });
  },
  data() {
    return {
      study: {},
      resource:global.imgAddress,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  },
  methods: {
    onClickRight() {
      this.$router.push({ path: "/my" });
    },
    studyDetail(id){
      this.$router.push({ path: "/studyDetail?studyId="+id });
    }
  }
};
</script>
<style scoped>
.m_bottom {
  margin-bottom: 1rem;
}

.swiperImg {
  height: 10rem;
  background: #fff;
}

.swiperImg img {
  height: 100%;
}
.default-title {
  text-align: left;
}
</style>