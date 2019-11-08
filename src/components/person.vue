  
<template>
  <div id="person">
    <!-- navbar -->
    <van-nav-bar title="个人中心"></van-nav-bar>
    <!-- 个人中心头部 -->
    <van-row id="avatarBox">
      <van-col span="8">
        <div id="icon1">
          <img
            width="50px"
            height="50px"
            src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
          />
        </div>
      </van-col>
      <van-col span="16">
        <div class="name">十号</div>
        <div class="name_tag">全心全意为人民服务</div>
      </van-col>
    </van-row>
    <!-- 基本信息 我的积分 -->
    <van-cell>
      <van-row>
        <van-col span="12" class="firstBox">基本信息</van-col>
        <van-col span="12" class="firstBox">我的积分(0)</van-col>
      </van-row>
    </van-cell>
    <!-- 个人中心列表 -->
    <van-cell-group>
      <van-cell icon="points" value="我的学习" to="/my" is-link />
      <van-cell icon="gold-coin-o" value="我的问答" to="/myQuestion" is-link />
      <van-cell icon="gift-o" value="我的订单" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#avatarBox {
  height: 10rem;
  background: #ccc;
  display: flex;
  align-items: center;
}
.name,
.name_tag {
  text-align: left;
}
.user-group {
  margin-bottom: 15px;
}
.user-links {
  padding: 15px 0;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
}
.firstBox {
  display: flex;
  align-items: center;
  height: 2rem;
  justify-content: center
}
#icon1 > img {
  border-radius: 50%;
}
</style>