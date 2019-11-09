<template>
  <div id="shopDetail">
    <!-- navbar -->
    <van-nav-bar title="商家详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
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