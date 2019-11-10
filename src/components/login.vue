<template>
  <div id="login">
    <van-cell-group class="pageSetting">
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" required />
      <van-field v-model="sms" center clearable label="验证码" placeholder="请输入短信验证码" required>
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
      <van-row class="btnBox">
        <van-button size="small" type="primary" @click="submit">提交</van-button>
      </van-row>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      sms: ""
    };
  },
  methods: {
    submit() {
      this.$router.push({ path: "/person" });
    }
  }
};
</script>
<style >
.btnBox {
  margin-top: 5rem;
}
</style>