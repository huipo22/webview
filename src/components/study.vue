<template>
  <div id="study">
    <!-- navbar -->
    <van-nav-bar title="学习中心" right-text="我的" @click-right="onClickRight"></van-nav-bar>
    <!-- swipter -->
    <van-swipe :autoplay="3000" class="swiperImg">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="resource +image.url" />
      </van-swipe-item>
    </van-swipe>
    <!-- list -->
    <van-grid :column-num="2">
      <van-grid-item @click="studyDetail(item.id)" item.id v-for="item in study" :key="item.id">
        <van-row>
          <div slot="default">
            <van-image fit="contain" :src="resource+item.img" />
            <div class="default-title title">{{item.title}}</div>
          </div>
          <van-row class="timeBox">
            <van-col
              span="14"
              class="title left"
              style="margin-top: .2rem;"
            >{{item.add_time|dCreateTime }}</van-col>

            <van-col span="10" class="title" v-if="item.process_type==0">
              <van-tag plain type="primary">未学习</van-tag>
            </van-col>
            <van-col span="10" class="title" v-else-if="item.process_type==1">
              <van-tag plain type="primary">学习中</van-tag>
            </van-col>
            <van-col span="10" class="title" v-else-if="item.process_type==2">
              <van-tag plain type="primary">已完成</van-tag>
            </van-col>
          </van-row>
        </van-row>
      </van-grid-item>
    </van-grid>
    <tabbar name="study" />
  </div>
</template>
<script>
import tabbar from "../components/common/tabbar";
import global from "../global";
import { Notify } from "vant";
export default {
  components: {
    tabbar
  },
  mounted() {
    let that = this;
    //轮播图
    this.axios.get("home/index/get_swipe?swipe_id=3").then(res => {
      if (res.data.code == 1) {
        that.images = res.data.data;
      }
    });
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
        } else {
          Notify({
            message: "token值不对",
            duration: 3000
          });
          // this.$router.push({ path: "/login" });
        }
      });
  },
  data() {
    return {
      study: {},
      resource: global.imgAddress,
      images: []
    };
  },
  methods: {
    onClickRight() {
      this.$router.push({ path: "/my" });
    },
    studyDetail(id) {
      this.$router.push({ path: "/studyDetail?studyId=" + id });
    }
  }
};
</script>
<style scoped>
.van-grid {
  margin-bottom: 50px;
}
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
  padding: 0px 0px;
  text-align: left;
  height: 2.5rem;
  overflow: hidden;
}
.timeBox {
  padding: 0;
}
</style>