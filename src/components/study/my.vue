<template>
  <div id="detail">
    <!-- navbar -->
    <van-nav-bar title="我的" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="学习中">
        <van-card
          thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
          class="tabBox"
          v-for="item in studying"
          :key="item.id"
          @click="studyDetail(item.study.id)"
        >
          <div slot="title" class="head" v-html="item.study.title"></div>
          <div slot="tags">
            <div v-if="!item.process">
              <van-progress :percentage="0" class="progressBox" />
            </div>
            <div v-else>
              <van-progress :percentage="Number(item.process)" class="progressBox" />
            </div>
            <van-row class="head">
              <van-col span="12" class="left" v-if="item.study.type==0">
                <van-tag plain type="primary">未学习</van-tag>
              </van-col>
              <van-col span="12" class="left" v-else-if="item.study.type==1">
                <van-tag plain type="primary">学习中</van-tag>
              </van-col>
              <van-col span="12" class="left" v-else-if="item.study.type==2">
                <van-tag plain type="primary">已完成</van-tag>
              </van-col>
              <van-col span="12" class="right">{{item.study.add_time | dCreateTime}}</van-col>
            </van-row>
          </div>
          <div slot="footer"></div>
        </van-card>
      </van-tab>
      <van-tab title="已完成" v-if="studyOver">
        <van-card
          thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
          class="tabBox"
          v-for="item in studyOver"
          :key="item.id"
          @click="studyDetail(item.study.id)"
        >
          <div slot="title" class="head" v-html="item.study.title"></div>
          <div slot="tags">
            <div v-if="!item.process">
              <van-progress :percentage="0" class="progressBox" />
            </div>
            <div v-else>
              <van-progress :percentage="Number(item.process)" class="progressBox" />
            </div>
            <van-row class="head">
              <van-col span="12" class="left" v-if="item.study.type==0">
                <van-tag plain type="primary">未学习</van-tag>
              </van-col>
              <van-col span="12" class="left" v-else-if="item.study.type==1">
                <van-tag plain type="primary">学习中</van-tag>
              </van-col>
              <van-col span="12" class="left" v-else-if="item.study.type==2">
                <van-tag plain type="primary">已完成</van-tag>
              </van-col>
              <van-col span="12" class="right">{{item.study.add_time | dCreateTime}}</van-col>
            </van-row>
          </div>
          <div slot="footer"></div>
        </van-card>
      </van-tab>
      <van-tab title="已完成" v-else>暂无数据</van-tab>
    </van-tabs>
    <tabbar name="study" />
  </div>
</template>
<script>
import global from "../../global";
import tabbar from "../../components/common/tabbar";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  components: {
    tabbar
  },
  data() {
    return {
      active: 0,
      studying: [],
      studyOver: []
    };
  },
  mounted() {
    let that = this;
    let params = this.qs.stringify({
      type: 1
    });
    let params2 = this.qs.stringify({
      type: 2
    });
    this.axios
      .post("/home/study/get_my", params, {
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
      .post("/home/study/get_my", params2, {
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
    },
    studyDetail(id) {
      this.$router.push({ path: "/studyDetail?studyId=" + id });
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
  overflow: hidden;
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