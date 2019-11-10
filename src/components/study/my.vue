<template>
  <div id="detail">
    <!-- navbar -->
    <van-nav-bar title="我的" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="学习中">
        <van-card thumb="https://img.yzcdn.cn/vant/t-thirt.jpg" class="tabBox">
          <div slot="title" class="head">中共中央印发《中国中产党支部工作条例》试行</div>
          <div slot="tags">
            <van-progress :percentage="50" class="progressBox" />
            <van-row class="head">
              <van-col span="12" class="left">完成章节1/1</van-col>
              <van-col span="12" class="right">2019-11-06</van-col>
            </van-row>
          </div>
          <div slot="footer"></div>
        </van-card>
      </van-tab>
      <van-tab title="已完成">内容 3</van-tab>
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
<style scoped>
.tabBox {
  background: #fff;
}
.head {
  height: 2rem;
  display: flex;
  align-items: center;
  text-align: left;
}
.progressBox {
  margin: 0.7rem 0;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
</style>