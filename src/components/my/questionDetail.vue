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
        <van-col>请问洛尔菲钢琴这个品牌好吗？有什么型号推荐？价格怎么样？</van-col>
      </van-row>
      <van-row>
        <van-col>3个回答</van-col>
      </van-row>
      <van-divider />
      <van-row>
        <van-col class="userInfo">
          <div>
            <img
              class="avatar"
              width="30px"
              height="30px"
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
    <!-- 回答list -->
    <van-row>
      <van-list>
        <van-panel class="questionList">
          <div slot="default" class="pannel-default">
            <van-row>
              <van-col class="userInfo">
                <div>
                  <img
                    class="avatar"
                    width="30px"
                    height="30px"
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
        <van-panel class="questionList">
          <div slot="default" class="pannel-default">
            <van-row>
              <van-col class="userInfo">
                <div>
                  <img
                    class="avatar"
                    width="30px"
                    height="30px"
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
    }
  }
};
</script>
