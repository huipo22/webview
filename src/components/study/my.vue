<template>
  <div id="detail">
    <!-- navbar -->
    <van-nav-bar title="我的" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="学习中">
        <van-card thumb="https://img.yzcdn.cn/vant/t-thirt.jpg" class="tabBox" v-for="item in studying.answer" :key="item.id">
          <div slot="title" class="head">{{item.content}}</div>
          <div slot="tags">
            <van-progress :percentage="50" class="progressBox" />
            <van-row class="head">
              <van-col span="12" class="left">完成章节1/1</van-col>
              <van-col span="12" class="right">{{item.add_time}}</van-col>
            </van-row>
          </div>
          <div slot="footer"></div>
        </van-card>
      </van-tab>
      <van-tab title="已完成">内容 3</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import global from "../../global";
export default {
  data() {
    return {
      active: 0,
      studying: [],
      studyOver: []
    };
  },
  mounted() {
    let that = this;
    let id = this.$route.query.studyId;
    let params = this.qs.stringify({
      type: 1
    });
    let params2 = this.qs.stringify({
      type: 2
    });
    this.axios
      .post("/home/forum/get_my", params, {
        headers: {
          "Device-Type": global.deviceType,
          token: JSON.parse(sessionStorage.getItem("userInfo")).token
        }
      })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.studying = res.data.data;
        }
      });
    this.axios
      .post("/home/forum/get_my", params2, {
        headers: {
          "Device-Type": global.deviceType,
          token: JSON.parse(sessionStorage.getItem("userInfo")).token
        }
      })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.studyOver = res.data.data;
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
.tabBox {
  background: #fff;
}
.head {
  height: 2rem;
  display: flex;
  align-items: center;
  text-align: left;
}
.progressBox {
  margin: 0.7rem 0;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
</style>