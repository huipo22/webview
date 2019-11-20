<template>
  <div id="order">
    <!-- navbar -->
    <van-nav-bar title="订单列表" left-arrow @click-left="onClickLeft"></van-nav-bar>
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