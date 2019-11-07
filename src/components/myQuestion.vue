<template>
  <div id="myQuestion">
    <!-- navbar -->
    <van-nav-bar title="我的回答" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="我的回答(3)">
        <van-row>
          <van-list>
            <van-panel class="questionList">
              <div slot="header" class="pannel-header">
                <van-row>
                  <van-col>请问洛尔菲钢琴这个品牌好吗？有什么型号推荐？价格怎么样？</van-col>
                </van-row>
              </div>
              <div slot="default" class="pannel-default">
                <van-row>
                  <van-col span="12">
                    <div class="itemleft">3个回答</div>
                  </van-col>
                  <van-col span="12">
                    <div class="itemright">默认时间</div>
                  </van-col>
                </van-row>
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
                    <div class="time">时间</div>
                  </van-col>
                  <van-col class="questionCon">
                    <p>一次，酒吧里，她喝醉了，就下意识亲了我。得逞之后，还想再来，但是，我拒绝了。因为我知道这样搞下去，朋友都没得做。是真的那种很会照顾人的姐姐一样的人设的朋友，一起出去旅游一起吃饭一起聊八卦。</p>
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
            <van-panel class="questionList">
              <div slot="header" class="pannel-header" @click="askDetail">
                <van-row>
                  <van-col>请问洛尔菲钢琴这个品牌好吗？有什么型号推荐？价格怎么样？</van-col>
                </van-row>
              </div>
              <div slot="footer" class="pannel-foot">
                <van-row>
                  <van-col span="12" class="left">2018-10-19</van-col>
                  <van-col span="12" class="right">3个回答</van-col>
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
export default {
  data() {
    return {
      active: 0
    };
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
.quill-editor{
  height: 20rem;
}
</style>