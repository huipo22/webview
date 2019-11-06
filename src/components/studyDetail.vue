<template>
  <div id="detail">
    <!-- navbar -->
    <van-nav-bar title="学习详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 图文 -->
    <div id="title">adfksdfjaklsdjflaksdjflkasdfjklasdjfalskdjflas</div>
    <div id="titleInfo">
      <div class="time">2019-05-09</div>
      <div class="readtime">需要时间</div>
    </div>
    <div id="content"></div>
    <van-row class="bottomBox">
      <van-col>已完成</van-col>
    </van-row>
  </div>
</template>
<script>
import Vue from "vue";
import { Row, Col } from "vant";

Vue.use(Row).use(Col);
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
#titleInfo {
  display: flex;
}
#titleInfo > .time {
  flex: 1;
  text-align: left;
}
.bottomBox {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 50px;
  width: 100%;
}
</style>