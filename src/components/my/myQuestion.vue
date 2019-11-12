<template>
  <div id="myQuestion">
    <!-- navbar -->
    <van-nav-bar title="我的回答" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="我的回答(3)">
        <van-row>
          <van-list>
            <van-panel class="questionList" v-for="item in answerList" :key="item.id">
              <div slot="header" class="pannel-header">
                <van-row>
                  <van-col>{{item.content}}</van-col>
                </van-row>
                <van-row>
                  <van-col span="12">
                    <div class="itemleft">{{}}个回答</div>
                  </van-col>
                  <van-col span="12">
                    <div class="itemright">{{item.add_time}}</div>
                  </van-col>
                </van-row>
              </div>
              <div slot="default" class="pannel-default">
                <van-row>
                  <van-col class="userInfo">
                    <div>
                      <img
                        class="avatar"
                        width="50px"
                        height="50px"
                        src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
                      />
                    </div>
                    <div class="name">十号</div>
                    <div class="time">{{item.question.add_time}}</div>
                  </van-col>
                  <van-col class="questionCon">
                    {{item.question.content}}
                  </van-col>
                </van-row>
              </div>
            </van-panel>
          </van-list>
        </van-row>
      </van-tab>
      <van-tab title="我的提问(3)">
        <van-row>
          <van-list>
            <van-panel class="questionList" v-for="item in questionList" :key="item.id">
              <div slot="header" class="pannel-header" @click="askDetail">
                <van-row>
                  <van-col v-html="item.content"></van-col>
                </van-row>
              </div>
              <div slot="footer" class="pannel-foot">
                <van-row>
                  <van-col span="12" class="left">{{item.add_time}}</van-col>
                  <van-col span="12" class="right">{{item.count}}个回答</van-col>
                </van-row>
              </div>
            </van-panel>
          </van-list>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import global from "../../global";
export default {
  data() {
    return {
      active: 0,
      questionList: [],
      answerList: []
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
          that.answerList = res.data.data.answer;
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
          that.questionList = res.data.data.question;
        } else {
          Toast.fail(res.data.msg);
        }
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    askDetail() {
      this.$router.push({ path: "/questionDetail" });
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
</style>