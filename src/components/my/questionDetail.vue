<template>
  <div id="questionDetail">
    <!-- navbar -->
    <van-nav-bar title="问题详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 问题内容 -->
    <!-- title -->
    <div slot="header" class="pannel-header questionDetail">
      <van-row>
        <van-col v-html="question.content" style="font-weight:bold"></van-col>
      </van-row>
      <van-row>
        <van-col class="userInfo">
          <div>
            <img
              v-if="question.user_info.avatar.startsWith('default')"
              class="avatar"
              width="30px"
              height="30px"
              :src="resource+question.user_info.avatar"
            />
            <img
              v-else
              class="avatar"
              width="30px"
              height="30px"
              :src="question.user_info.avatar"
            />
          </div>
          <div
            class="name h_titles"
          >{{!question.user_info.user_nickname?'游客':question.user_info.user_nickname}}</div>
          <div class="name h_titles" style="padding: 0;">{{question.count}}条回答</div>
          <div class="time h_titles">{{question.user_info.create_time |dCreateTime}}</div>
        </van-col>
      </van-row>
    </div>
    <div class="fenge"></div>
    <!-- 回答list -->
    <van-row>
      <van-list>
        <div
          slot="default"
          class="pannel-default questionDetail"
          v-for="item in question.answers"
          :key="item.id"
        >
          <van-row>
            <van-col class="userInfo">
              <div>
                <img
                  class="avatar"
                  width="30px"
                  height="30px"
                  :src="item.user_info.avatar==''?'https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png':resource+item.user_info.avatar"
                />
              </div>
              <div class="name h_titles">{{item.user_info.user_nickname}}</div>
              <div class="time h_titles">{{item.add_time|dCreateTime}}</div>
            </van-col>
            <van-col class="questionCon" v-html="item.content"></van-col>
          </van-row>
          <van-divider />
        </div>
      </van-list>
    </van-row>
    <!-- +号 -->
    <van-row>
      <van-col span="24" class="plusBox">
        <van-button round type="info" color="#1989fa" @click="askQuestion">我要回答</van-button>
        <!-- <van-icon name="plus" size="2rem" class="plus" @click="askQuestion" /> -->
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { Toast } from "vant";
import global from "../../global";
export default {
  data() {
    return {
      question: {},
      resource: global.imgAddress
    };
  },
  mounted() {
    let id = this.$route.query.questionId; //home 携带过来的分类id
    let that = this;
    this.axios
      .post("/home/forum/forum_detail", { question_id: id })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.question = res.data.data;
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
      let id = this.$route.query.questionId;
      this.$router.push({ path: "/myAsk?questionId=" + id });
    }
  }
};
</script>
<style scoped>
.questionDetail {
  padding: 0 1rem;
}
.plusBox {
  text-align: center;
  position: fixed;
  bottom: 50px;
  z-index: 999;
}
.userInfo {
  display: flex;
}
.pannel-header {
  margin-bottom: 0;
}
.fenge {
  width: 100%;
  height: 10px;
  background: #f0f3f6;
}
</style>
