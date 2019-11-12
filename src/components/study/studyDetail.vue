<template>
  <div id="detail">
    <!-- navbar -->
    <van-nav-bar title="学习详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 图文 -->
    <div id="detailBox">
      <div id="title">{{studyData.title}}</div>
      <div id="titleInfo">
        <div class="time">{{studyData.add_time}}</div>
        <div class="readtime">需要时间</div>
      </div>
      <div id="content">
        {{studyData.content}}
      </div>
    </div>
    <van-row class="bottomBox">
      <!-- <van-col>已完成</van-col> -->
      <van-col>
        <van-count-down :time="time" />
      </van-col>
    </van-row>
  </div>
</template>
<script>
import global from '../../global'
export default {
  data() {
    return {
      time: 3 * 60 * 60 * 1000,
      studyData:{},
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
  height: calc(100vh - 10rem);
}
#title {
  font-size: 1.5rem;
  text-align: left;
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
</style>