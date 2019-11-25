<template>
  <div id="zhaoshang">
    <!-- navbar -->
    <van-nav-bar title="招商加盟" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- form -->
    <van-cell-group class="zhaoshang">
      <van-field v-model="username" required clearable label="姓名" placeholder="请输入姓名" />
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" required />
      <van-field
        v-model="address"
        placeholder="请选择省市区"
        label="地址"
        @click="showAddressChuang"
        required
      />
      <van-row class="btnBox">
        <van-button
          size="small"
          round
          style="width:100%"
          color="#1989fa"
          type="primary"
          @click="submit"
        >提交</van-button>
      </van-row>
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
import global from "../../global";
import { Toast } from "vant";
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
    submit() {
      if (!this.username) {
        Toast.fail("请输入姓名");
        return;
      } else if (!this.phone) {
        Toast.fail("请输入手机号");
        return;
      } else if (!this.address) {
        Toast.fail("请选择地址");
        return;
      }
      let area = this.address.split("/");
      let params = this.qs.stringify({
        province: area[0],
        city: area[1],
        county: area[2],
        name: this.username,
        mobile: this.phone
      });
      this.axios
        .post("/home/index/add_attract", params, {
          headers: {
            "Device-Type": global.deviceType,
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(localStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          // window.console.log(res);
          if (res.data.code == 1) {
            Toast.success('提交成功');
            this.$router.go(-1);
          } else {
            Toast.fail(res.data.msg);
          }
        });
    },
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