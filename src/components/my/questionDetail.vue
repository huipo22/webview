<template>
  <div id="questionDetail">
    <!-- navbar -->
    <van-nav-bar
      title="问题详情"
      left-arrow
      @click-left="onClickLeft"
      right-text="我的"
      @click-right="onClickRight"
    ></van-nav-bar>
    <!-- 问题内容 -->
    <!-- title -->
    <div slot="header" class="pannel-header">
      <van-row>
        <van-col>{{question.content}}</van-col>
      </van-row>
      <van-row>
        <van-col>{{question.count}}个回答</van-col>
      </van-row>
      <van-divider />
      <!-- +号 -->
      <van-row>
        <van-col span="24" class="plusBox">
          <van-icon name="plus" size="2rem" class="plus" @click="askQuestion" />
        </van-col>
      </van-row>
    </div>
    <!-- 回答list -->
    <van-row>
      <van-list>
        <van-panel class="questionList" v-for="item in question.answers" :key="item.id">
          <div slot="default" class="pannel-default">
            <van-row>
              <van-col class="userInfo">
                <div>
                  <img
                    class="avatar"
                    width="30px"
                    height="30px"
                    :src="item.user_info.avatar==''?'https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png':item.user_info.avatar"
                  />
                </div>
                <div class="name">{{item.user_info.user_nickname}}</div>
                <div class="time">{{item.add_time|dCreateTime}}</div>
              </van-col>
              <van-col class="questionCon">{{item.content}}</van-col>
            </van-row>
          </div>
        </van-panel>
      </van-list>
    </van-row>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      question: {}
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
.plusBox {
  text-align: center;
  position: fixed;
  bottom: 50px;
}
</style>
