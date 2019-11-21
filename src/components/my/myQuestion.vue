<template>
  <div id="myQuestion">
    <!-- navbar -->
    <van-nav-bar title="我的问答" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab :title="mys">
        <van-row>
          <van-list>
            <van-panel
              v-for="item in answerList.answer"
              :key="item.id"
              @click="askDetail(item.question.id)"
            >
              <!-- 问题 -->
              <van-row class="questionList">
                <van-col v-html="item.question.content" style="font-weight:bold"></van-col>
              </van-row>
              <van-row class="questionList">
                <van-col class="userInfo">
                  <div>
                    <img
                     v-if="item.question.user_info.avatar.startsWith('default')"
                      class="avatar"
                      width="30px"
                      height="30px"
                      :src="resource+item.question.user_info.avatar"
                    />
                    <img
                     v-else
                      class="avatar"
                      width="30px"
                      height="30px"
                      :src="item.question.user_info.avatar"
                    />
                  </div>
                  <div
                    class="name h_titles"
                  >{{!item.question.user_info.user_nickname?'游客':item.question.user_info.user_nickname}}</div>
                  <div class="name h_titles" style="padding: 0;">{{item.question.count}}条回答</div>
                  <div class="time h_titles">{{item.question.user_info.create_time |dCreateTime}}</div>
                </van-col>
              </van-row>
              <div class="fenge1"></div>
              <!-- 答案 -->
              <van-row class="questionList">
                <van-col class="userInfo">
                  <div>
                    <img
                    v-if="item.user_info.avatar.startsWith('default')"
                      class="avatar"
                      width="30px"
                      height="30px"
                      :src="item.user_info.avatar==''?'https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png':resource+item.user_info.avatar"
                    />
                    <img
                    v-else
                      class="avatar"
                      width="30px"
                      height="30px"
                      :src="item.user_info.avatar==''?'https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png':item.user_info.avatar"
                    />
                  </div>
                  <div class="name h_titles">{{item.user_info.user_nickname}}</div>
                  <div class="time h_titles">{{item.add_time|dCreateTime}}</div>
                </van-col>
                <van-col class="questionCon" v-html="item.content"></van-col>
              </van-row>
              <div class="fenge"></div>
            </van-panel>
          </van-list>
        </van-row>
      </van-tab>
      <van-tab :title="myq">
        <van-row>
          <van-list>
            <van-panel
              class="questionList"
              v-for="item in questionList.question"
              :key="item.id"
              @click="askDetail(item.id)"
            >
              <van-row class="questionList">
                <van-col v-html="item.content" style="font-weight:bold" ></van-col>
              </van-row>
              <van-row class="questionList">
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
              <div class="fenge1"></div>
            </van-panel>
          </van-list>
        </van-row>
      </van-tab>
    </van-tabs>
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
      active: 0,
      questionList: [],
      answerList: [],
      myq: null,
      mys: null,
      resource: global.imgAddress
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
      .post("/home/forum/get_my", params, {
        headers: {
          "Device-Type": global.deviceType,
          "Content-Type": "application/x-www-form-urlencoded",
          token: JSON.parse(sessionStorage.getItem("userInfo")).token
        }
      })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.mys = "我的回答(" + res.data.data.a_conunt + ")";
          that.answerList = res.data.data;
        } else {
          Toast.fail(res.data.msg);
        }
      });
    this.axios
      .post("/home/forum/get_my", params2, {
        headers: {
          "Device-Type": global.deviceType,
          "Content-Type": "application/x-www-form-urlencoded",
          token: JSON.parse(sessionStorage.getItem("userInfo")).token
        }
      })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.myq = "我的提问(" + res.data.data.q_conunt + ")";
          that.questionList = res.data.data;
        } else {
          Toast.fail(res.data.msg);
        }
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    askDetail(id) {
      this.$router.push({ path: "/questionDetail?questionId=" + id });
    }
  }
};
</script>
<style>
.questionList {
  padding: 0 1rem;
}
.pannel-header {
  text-align: left;
  margin-bottom: 1rem;
}
.van-panel__header {
  display: none !important;
}
.pannel-foot .left {
  text-align: left;
}
.pannel-foot .right {
  text-align: right;
}
.userInfo {
  display: flex;
  width: 100%;
  align-items: center;
}
.userInfo .avatar {
  border-radius: 50%;
}
.userInfo .name {
  flex: 1;
  text-align: left;
  padding-left: 1rem;
}
.questionCon {
  text-align: left;
}
.item {
  display: flex;
}
.itemleft {
  text-align: left;
}
.itemright {
  text-align: right;
}
.quill-editor {
  height: 20rem;
}
.fenge {
  width: 100%;
  height: 10px;
  background: #f0f3f6;
}
.fenge1 {
  width: 100%;
  height: 2px;
  background: #f0f3f6;
}
</style>