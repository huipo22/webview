<template>
  <div id="login">
    <!-- navbar -->
    <van-nav-bar title="登录"></van-nav-bar>
    <van-cell-group class="pageSetting page">
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" required />
      <!-- <van-field v-model="sms" center clearable label="验证码" placeholder="请输入短信验证码" required>
        <van-button
          slot="button"
          size="small"
          color="#1989fa"
          type="primary"
          :disabled="disabled"
          @click="validateBtn"
        >{{btnTitle}}</van-button>
      </van-field>-->
      <van-row>
        <van-field v-model="sms" center clearable label="验证码" placeholder="请输入下方验证码" required></van-field>
        <div class="coderight" @click="refreshCode">
          <SIdentify :identifyCode="identifyCode" @click="refreshCode"></SIdentify>
        </div>
      </van-row>
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
  </div>
</template>
<script>
import global from "../global";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import SIdentify from "./common/identify";
export default {
  components: {
    SIdentify
  },
  data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      phone: "",
      sms: "",
      btnTitle: "发送验证码",
      disabled: false,
      imgCode: "/api/user/verification_code/send"
    };
  },
  created() {
    if (!sessionStorage.getItem("userInfo")) {
      this.phone = "";
    } else {
      let mobile = JSON.parse(sessionStorage.getItem("userInfo")).user.mobile;
      this.phone = mobile;
      this.$router.replace({
        path:
          "/home?token=" + JSON.parse(sessionStorage.getItem("userInfo")).token
      });
    }
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    //验证码abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },
    submit() {
      if (this.sms !== this.identifyCode) {
        Toast.fail("验证码不一致");
        return;
      }
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
            sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
            let user = JSON.parse(sessionStorage.getItem("userInfo"));
            if (
              !user.user.user_nickname ||
              !user.user.signature ||
              !user.user.address
            ) {
              this.$router.replace({ path: "/baseInfo?new=0" });
            } else {
              Toast.success("登录成功");
              this.$router.replace({ path: "/person" });
            }
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
.page {
  height: 88vh;
}
</style>