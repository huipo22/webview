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
      <van-col span="24" v-if="studyData.process==100" class="succ">
        <van-col span="24" class="title">
          <van-icon name="success" color="red" size="20px" />
          <!-- 已完成 -->
        </van-col>
      </van-col>
      <van-col span="24" v-else>
        <van-col span="24" class="title">
          学习倒计时
          <van-count-down ref="countDown" class="color" :time="time" />
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
      studyData: {},
      count: null
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
          token: JSON.parse(localStorage.getItem("userInfo")).token
        }
      })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.studyData = res.data.data;
          that.count = res.data.data.study_time; //总分钟
          // 剩余学习进度
          that.time =
            ((100 - res.data.data.process) / 100) *
            res.data.data.study_time *
            60 *
            1000;
        }
      });
  },
  methods: {
    onClickLeft() {
      let total = this.count * 60; //总分钟
      let Surplus = global.time_to_sec(this.$refs.countDown.$el.innerText); //剩余分钟
      window.console.log(total, Surplus);
      // return
      let process = 100 - Math.round((Surplus / total) * 100); //学习进度
      let id = this.$route.query.studyId;
      let params = this.qs.stringify({
        id: id,
        process: process
      });
      let that = this;
      this.axios
        .post("/home/study/update_study", params, {
          headers: {
            "Device-Type": global.deviceType,
            token: JSON.parse(localStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
          }
        });
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
  overflow: hidden;
  margin-bottom: 50px;
}
#content >>> img {
  width: 100%;
}
#title {
  text-align: center;
  font-size: 18px;
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
.succ {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>