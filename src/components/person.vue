  
<template>
  <div id="person">
    <!-- navbar -->
    <van-nav-bar title="个人中心"></van-nav-bar>
    <img
      class="user-poster"
      src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
    />

    <!-- <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>-->

    <van-cell-group>
      <van-cell icon="points" value="我的积分" is-link />
      <van-cell icon="gold-coin-o" value="我的优惠券" is-link />
      <van-cell icon="gift-o" value="内容" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  
};
</script>

<style scoped>
.user-poster {
  width: 100%;
  height: 53vw;
  display: block;
}
.user-group {
  margin-bottom: 15px;
}
.user-links {
  padding: 15px 0;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
  .van-icon {
    display: block;
    font-size: 24px;
  }
}
</style>