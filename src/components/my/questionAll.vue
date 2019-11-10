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
      <van-list>
        <van-panel class="questionList" @click="questionDetail">
          <div slot="header" class="pannel-header">
            <van-row>
              <van-col>请问洛尔菲钢琴这个品牌好吗？有什么型号推荐？价格怎么样？</van-col>
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
    <!-- +号 -->
    <van-row>
      <van-col span="24" class="plusBox">
        <van-icon name="plus" size="2rem" class="plus" @click="askQuestion" />
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
    questionDetail() {
      this.$router.push({ path: "/questionDetail" });
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
  text-align: left;
}
.userInfo {
  display: flex;
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
  bottom: 50px;
}
.plus {
  border-radius: 50%;
  background: #6aa2da;
  color: #fff;
}
</style>