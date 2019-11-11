<template>
  <div id="login">
    <van-cell-group class="pageSetting">
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" required />
      <van-field v-model="sms" center clearable label="验证码" placeholder="请输入短信验证码" required>
        <van-button
          slot="button"
          size="small"
          type="primary"
          :disabled="disabled"
          @click="validateBtn"
        >{{btnTitle}}</van-button>
      </van-field>
      <van-row class="btnBox">
        <van-button size="small" type="primary" @click="submit">提交</van-button>
      </van-row>
    </van-cell-group>
  </div>
</template>
<script>
import global from "../global";
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
export default {
  data() {
    return {
      phone: "",
      sms: "",
      btnTitle: "发送验证码",
      disabled: false
    };
  },
  methods: {
    submit() {
      let that = this;
      this.axios
        .post("/user/public/login", {
          username: that.phone,
          verification_code: that.sms,
          device_type: global.deviceType
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
            this.$router.push({ path: "/person" });
          } else {
            Toast.fail(res.data.msg);
          }
        });
    },
    validateBtn() {
      //倒计时
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.disabled = false;
          this.btnTitle = "获取验证码";
        } else {
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    }
  }
};
</script>
<style >
.btnBox {
  margin-top: 5rem;
}
</style>