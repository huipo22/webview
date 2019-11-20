<template>
  <div id="questionAll">
    <!-- navbar -->
    <van-nav-bar
      title="问答广场"
      left-arrow
      @click-left="onClickLeft"
      right-text="我的"
      @click-right="onClickRight"
    ></van-nav-bar>
    <!-- 问题内容 -->
    <van-row>
      <van-list v-for="item in questionAll" :key="item.id">
        <van-panel class="questionList" @click="questionDetail(item.id)">
          <div slot="header" class="pannel-header">
            <van-row>
              <van-col v-html="item.content" style="font-weight:bold"></van-col>
            </van-row>
          </div>
          <div slot="default" class="pannel-default">
            <van-row>
              <van-col class="userInfo">
                <div>
                  <img
                    v-if="item.user_info.avatar.startsWith('default')"
                    class="avatar"
                    width="30px"
                    height="30px"
                    :src="resource+item.user_info.avatar"
                  />
                  <img
                    v-else
                    class="avatar"
                    width="30px"
                    height="30px"
                    :src="item.user_info.avatar"
                  />
                </div>
                <div
                  class="name h_titles"
                >{{!item.user_info.user_nickname?'游客':item.user_info.user_nickname}}</div>
                <div class="name h_titles" style="padding: 0;">{{item.count}}条回答</div>
                <div class="time h_titles">{{item.user_info.create_time |dCreateTime}}</div>
              </van-col>
            </van-row>
          </div>
        </van-panel>
      </van-list>
    </van-row>
    <!-- +号 -->
    <van-row>
      <van-col span="24" class="plusBox">
        <van-button round type="info" color="#1989fa" @click="askQuestion">我要提问</van-button>
        <!-- <van-icon name="plus" size="2rem" class="plus" @click="askQuestion" /> -->
      </van-col>
    </van-row>
  </div>
</template>
<script>
import global from "../../global";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      resource: global.imgAddress,
      questionAll: []
    };
  },
  mounted() {
    let that = this;
    this.axios
      .get("/home/forum/index", {
        headers: {
          "Device-Type": global.deviceType,
          "Content-Type": "application/x-www-form-urlencoded",
          token: JSON.parse(sessionStorage.getItem("userInfo")).token
        }
      })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.questionAll = res.data.data;
        } else {
          Toast.fail(res.data.msg);
        }
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({ path: "/myQuestion" });
    },
    askQuestion() {
      this.$router.push({ path: "/askQuestion" });
    },
    questionDetail(id) {
      this.$router.push({ path: "/questionDetail?questionId=" + id });
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 40) {
        return value.slice(0, 40) + "...";
      }
      return value;
    }
  }
};
</script>
<style scoped>
.questionList {
  font-size: 17px;
  text-align: left;
}
.userInfo {
  display: flex;
  margin-top: -25px;
}
.questionCon {
  height: 5rem;
  -webkit-line-clamp: 3;
  /* 将对象作为弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /*子元素的排列方式 */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.plusBox {
  position: fixed;
  bottom: 18px;
}
.plus {
  border-radius: 50%;
  background: #6aa2da;
  color: #fff;
}
.pd {
  padding: 10px;
}
</style>