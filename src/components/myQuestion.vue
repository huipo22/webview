<template>
  <div id="myQuestion">
    <!-- navbar -->
    <van-nav-bar title="我的回答" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="我的回答">
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
                  <van-col class="userInfo">
                    <div>
                      <img
                        width="50px"
                        height="50px"
                        src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
                      />
                    </div>
                    <div>十号</div>
                    <div>时间</div>
                  </van-col>
                  <van-col>
                    <p>一次，酒吧里，她喝醉了，就下意识亲了我。得逞之后，还想再来，但是，我拒绝了。因为我知道这样搞下去，朋友都没得做。是真的那种很会照顾人的姐姐一样的人设的朋友，一起出去旅游一起吃饭一起聊八卦。</p>
                  </van-col>
                </van-row>
              </div>
              <!-- <div slot="footer" class="pannel-foot">
              <van-row>
                  <van-col>赞同</van-col>
                  <van-col>更多</van-col>
                  <van-col>评论</van-col>
                  <van-col><van-icon name="ellipsis" size="2rem"/></van-col>
              </van-row>
              </div>-->
            </van-panel>
          </van-list>
        </van-row>
      </van-tab>
      <van-tab title="我的提问">
        <van-row>
          <van-list>
            <van-panel class="questionList">
              <div slot="header" class="pannel-header">
                <van-row>
                  <van-col>请问洛尔菲钢琴这个品牌好吗？有什么型号推荐？价格怎么样？</van-col>
                </van-row>
              </div>
              <div slot="footer" class="pannel-foot">
                <van-row>
                  <van-col>2018-10-19</van-col>
                  <van-col>3个回答</van-col>
                  <van-col>5个关注</van-col>
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
    }
  }
};
</script>