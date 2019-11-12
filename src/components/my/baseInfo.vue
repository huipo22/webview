<template>
  <div id="baseInfo">
    <!-- navbar -->
    <van-nav-bar
      title="基本信息"
      left-arrow
      @click-left="onClickLeft"
      right-text="提交"
      @click-right="onClickRight"
    ></van-nav-bar>
    <!-- 设置区域 -->
    <van-cell-group class="pageSetting">
      <van-field
        v-model="baseInfo.user_nickname"
        required
        clearable
        label="昵称"
        placeholder="请输入昵称"
      />
      <van-cell required>
        <van-row>
          <van-col style="text-align:center;width:90px">性别</van-col>
          <van-col>
            <van-radio-group v-model="baseInfo.sex" class="radioBox">
              <van-radio name="0">男</van-radio>
              <van-radio name="1">女</van-radio>
            </van-radio-group>
          </van-col>
        </van-row>
      </van-cell>
      <!-- </van-field> -->
      <van-field v-model="baseInfo.signature" label="签名" placeholder="请输入个性签名" required />
      <van-field
        v-model="address"
        placeholder="请选择省市区"
        label="地址"
        @click="showAddressChuang"
        required
      />
      <van-field v-model="baseInfo.address" label="详细地址" placeholder="请输入详细地址" required />
      <van-field v-model="baseInfo.gonghui" label="工会" placeholder="请输入工会" required />
      <!-- <van-field
        readonly
        clickable
        label="工会"
        :value="value"
        placeholder="选择工会"
        @click="showPicker = true"
      />-->
      <van-cell>
        <van-uploader :after-read="afterRead" />
      </van-cell>
      <input type="file" @change="aa" />
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
    <!-- 工会选择 -->
    <!-- <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>-->
  </div>
</template>
<script>
import addressList from "../../dist/area";
import global from "../../global";
export default {
  data() {
    return {
      baseInfo: {},
      // username: "", //昵称
      // signname: "", //签名
      // sex: "", //性别
      address: "",
      addressInfo: "", //  详细地址
      showAddress: false,
      // 当前选中的省市区code
      areaNum: "",
      // 省市区列表
      areaList: addressList
      // 工会
      // value: "",
      // showPicker: false,
      // columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"]
    };
  },
  mounted() {
    // get 基本信息
    let that = this;
    this.axios
      .get("/user/profile/userInfo", {
        headers: {
          "Device-Type": global.deviceType,
          token: global.token
        }
      })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.baseInfo = res.data.data;
        }
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //提交
    onClickRight() {
      let that = this;
      this.axios
        .post("/user/profile/userInfo", {
          headers: {
            "Device-Type": global.deviceType,
            token: global.token
          },
          params: {
            user_nickname: that.baseInfo.user_nickname,
            avatar: that.baseInfo.avatar,
            signature: that.baseInfo.signature,
            sex: that.baseInfo.sex,
            address: that.baseInfo.address,
            gonghui: that.baseInfo.gonghui
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
            this.$router.push({ path: "/person" });
          }
        });
    },
    // 上传文件
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      window.console.log(file);
      this.axios
        .post("/user/upload/one", {
          headers: {
            "Device-Type": global.deviceType,
            token: global.token,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          params: {
            file: file.content
          }
        })
        .then(res => {
          window.console.log(res);
        });
    },
    aa(file) {
      window.console.log(file);
      // this.axios
      //   .post("/user/upload/one", {
      //     headers: {
      //       "Device-Type": global.deviceType,
      //       token: global.token,
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     },
      //     params: {
      //       file: file
      //     }
      //   })
      //   .then(res => {
      //     window.console.log(res);
      //   });
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
    // 所属工会
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    }
  }
};
</script>
<style scoped>
.radioBox {
  display: flex;
  justify-content: flex-end;
}
.radioBox > .van-radio {
  padding: 0 0.5rem;
}
</style>
