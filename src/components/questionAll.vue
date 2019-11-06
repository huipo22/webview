<template>
  <div id="questionAll">
    <!-- navbar -->
    <van-nav-bar title="问答广场" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 问题内容 -->
    <van-row>
      <van-list>
        <van-panel>
          <div slot="default" class="pannel-default">
            <van-row>
              <van-col span="18">请问洛尔菲钢琴这个品牌好吗？有什么型号推荐？价格怎么样？</van-col>
              <van-col span="6">0回答</van-col>
            </van-row>
          </div>
          <div slot="footer" class="pannel-foot"></div>
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
    }
  }
};
</script>
<style scoped>
</style>