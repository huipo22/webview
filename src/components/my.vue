<template>
  <div id="detail">
    <!-- navbar -->
    <van-nav-bar title="我的" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="全部">
        <van-card thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
          <div slot="title">ddddddddddddddddddddddddd</div>
          <div slot="tags">
            <van-progress :percentage="50" />
            <van-col>完成章节1/1</van-col>
            <van-col>2019-11-06</van-col>
            
          </div>
          <div slot="footer"></div>
        </van-card>
      </van-tab>
      <van-tab title="学习中">内容 2</van-tab>
      <van-tab title="已完成">内容 3</van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>