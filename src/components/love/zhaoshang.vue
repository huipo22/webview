<template>
  <div id="zhaoshang">
    <!-- navbar -->
    <van-nav-bar title="招商加盟" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- form -->
    <van-cell-group class="zhaoshang">
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" error-message="手机号格式错误" required />
      <van-field
        v-model="address"
        placeholder="请选择省市区"
        label="地址"
        @click="showAddressChuang"
        required
      />
      <van-button type="primary">提交</van-button>
    </van-cell-group>
    <!-- 省市区选择弹窗 -->
    <van-popup v-model="showAddress" position="bottom" :style="{ height: '50%' }">
      <van-area
        :area-list="areaList"
        :value="areaNum"
        @confirm="sure"
        @cancel="exit"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>
<script>
import addressList from "../../dist/area";
export default {
  data() {
    return {
      username: "",
      phone: "",
      areaname: "",
      address: "",
      showAddress: false,
      // 当前选中的省市区code
      areaNum: "",
      // 省市区列表
      areaList: addressList
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 点击展示地址弹窗
    showAddressChuang() {
      this.showAddress = true;
    },
    // 三级联动点击确定按钮事件
    sure(val) {
      window.console.log(val);
      this.address = val[0].name + "/" + val[1].name + "/" + val[2].name;
      this.showAddress = false;
    },
    // 三级联动点击取消按钮事件
    exit() {
      this.showAddress = false;
    },
    // 三级联动状态改变事件
    onChange() {}
  }
};
</script>
<style>
.zhaoshang {
  padding: 10px 16px;
}
</style>