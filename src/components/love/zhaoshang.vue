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
      <van-field label="身份证正面(国徽)" label-width="150px" required>
        <van-uploader :after-read="afterReadcartTrue" result-type="file" slot="input">
          <img :src="cartTrue" ref="cartTrue" class="avater" />
        </van-uploader>
      </van-field>
      <van-field label="身份证反面(人像)" label-width="150px" required>
        <van-uploader :after-read="afterReadcartFalse" result-type="file" slot="input">
          <img :src="cartFalse" ref="cartFalse" class="avater" />
        </van-uploader>
      </van-field>
      <van-field label="营业执照" required>
        <van-uploader :after-read="afterReadLicence" result-type="file" slot="input">
          <img :src="licence" ref="licence" class="avater" />
        </van-uploader>
      </van-field>
      <van-field label="门头照" required>
        <van-uploader :after-read="afterReadPhoto" result-type="file" slot="input">
          <img :src="head_photo" ref="head_photo" class="avater" />
        </van-uploader>
      </van-field>
      <van-field v-model="remark" placeholder="请输入备注" label="备注" />
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
      areaList: addressList,
      cartTrue:
        "http://m.guojimami.com/themesmobile/mbts1/images/shenfen0813_02.jpg",
      cartFalse:
        "http://m.guojimami.com/themesmobile/mbts1/images/shenfen0813_03.jpg",
      licence:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574842428062&di=9974b1eb8b2f233c3af3792ab18e73ce&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190301%2Fa1247deb398c47618de1ab0ed5d0ce70.jpeg",
      head_photo:
        "http://img1.imgtn.bdimg.com/it/u=2912589256,2919990811&fm=26&gp=0.jpg",
      remark: ""
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
        mobile: this.phone,
        license_card: this.cartTrue, //正面
        back_card: this.cartFalse, //反面
        license: this.licence, //营业执照
        head_photo: this.head_photo, //门头照,
        remark: this.remark //备注
      });
      this.axios
        .post("/home/index/add_attract", params, {
          headers: {
            "Device-Type": global.deviceType,
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(sessionStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
            Toast.success("提交成功");
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
    onChange() {},
    uploadFile(file, pa) {
      // 此时可以自行将文件上传至服务器
      let formData = new window.FormData();
      formData.append("file", file.file);
      let that = this;
      this.axios
        .post("/user/upload/one", formData, {
          headers: {
            "Device-Type": global.deviceType,
            token: JSON.parse(sessionStorage.getItem("userInfo")).token,
            "Content-Type":
              "multipart/form-data;boundary = " + new Date().getTime()
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            window.console.log(pa);
            if (pa == "cartTrue") {
              that.cartTrue = global.imgAddress + res.data.data.url;
            } else if (pa == "cartFalse") {
              that.cartFalse = global.imgAddress + res.data.data.url;
            } else if (pa == "licence") {
              that.licence = global.imgAddress + res.data.data.url;
            } else if (pa == "head_photo") {
              that.head_photo = global.imgAddress + res.data.data.url;
            }
          }
        });
    },
    // 上传身份证正面
    afterReadcartTrue(file) {
      this.uploadFile(file, "cartTrue");
    },
    // 上传身份证反面
    afterReadcartFalse(file) {
      this.uploadFile(file, "cartFalse");
    },
    // 营业执照
    afterReadLicence(file) {
      this.uploadFile(file, "licence");
    },
    // 门头照
    afterReadPhoto(file) {
      this.uploadFile(file, "head_photo");
    }
  }
};
</script>
<style>
.zhaoshang {
  padding: 10px 16px;
}
.avater {
  height: 50px;
}
.labelBox {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>