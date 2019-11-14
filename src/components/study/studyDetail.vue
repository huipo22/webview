<template>
  <div id="detail">
    <!-- navbar -->
    <van-nav-bar title="学习详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 图文 -->
    <div id="detailBox">
      <div id="title" class="title_h1 bold">{{studyData.title}}</div>
      <div id="titleInfo">
        <div class="time title">{{studyData.add_time | dCreateTime}}</div>
        <div class="readtime title color">学习时长:{{studyData.study_time}}分钟</div>
      </div>
      <div id="content" class="title" v-html="studyData.content"></div>
    </div>
    <van-row class="bottomBox">
      <!-- <van-col>已完成</van-col> -->
      <van-col span="24">
        <van-col span="24" class="title">
          学习倒计时
          <van-count-down class="color" :time="time" />
        </van-col>
      </van-col>
    </van-row>
    <tabbar name="study" />
  </div>
</template>
<script>
import global from "../../global";
import tabbar from "../../components/common/tabbar";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      // time: 3 * 60 * 60 * 1000,
      time: null,
      studyData: {}
    };
  },
  mounted() {
    let that = this;
    let id = this.$route.query.studyId;
    let params = this.qs.stringify({
      study_id: id
    });
    this.axios
      .post("/home/study/study_detail", params, {
        headers: {
          "Device-Type": global.deviceType,
          token: JSON.parse(sessionStorage.getItem("userInfo")).token
        }
      })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.studyData = res.data.data;
          that.time = res.data.data.study_time * 60 * 60 * 1000;
        }
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
#detailBox {
  padding: 0 1rem;
  background: #fff;
}
#content {
  /* height: calc(100vh - 10rem); */
  width: 100%;
  overflow: hidden
}
#content p>image{
  width: 100%
}
#title {
  text-align: center;
  font-size: 18px
}
#titleInfo {
  display: flex;
  height: 3rem;
  align-items: center;
}
#titleInfo > .time {
  flex: 1;
  text-align: left;
}
.bottomBox {
  height: 2rem;
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 50px;
  width: 100%;
  background: #fff;
}
.color {
  color: red;
}
</style>