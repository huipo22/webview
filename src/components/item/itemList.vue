<template>
  <div id="itemList">
    <!-- navbar -->
    <van-nav-bar title="itemList" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- list列表 -->
    <van-row>
      <van-list>
        <van-panel>
          <!-- <div slot="header" class="pannel-head">
            <van-col span="6">职工之家</van-col>
            <van-col offset="14" span="4" @click="moreList">更多</van-col>
          </div>-->
          <div slot="default" class="pannel-default" @click="itemDetail">
            <van-row>
              <van-col offset="1" span="13" class="left">警惕！电动车祸患不可小觑1111111111111</van-col>
              <van-col span="10">
                <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt height="50px" />
              </van-col>
            </van-row>
            <van-row>
              <van-col offset="1" span="13" class="left">2019.11.5</van-col>
            </van-row>
          </div>
        </van-panel>
      </van-list>
    </van-row>
  </div>
</template>
<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 详情
    itemDetail() {
      this.$router.push({ path: "/itemDetail" });
    }
  }
};
</script>