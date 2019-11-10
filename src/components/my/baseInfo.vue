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
        v-model="username"
        required
        clearable
        label="昵称"
        right-icon="question-o"
        placeholder="请输入昵称"
        @click-right-icon="$toast('question')"
      />
      <van-field v-model="signname" label="签名" placeholder="请输入个性签名" required />
      <van-field
        v-model="address"
        placeholder="请选择省市区"
        label="地址"
        @click="showAddressChuang"
        required
      />
      <van-field v-model="addressInfo" label="详细地址" placeholder="请输入详细地址" required />
      <van-field
        readonly
        clickable
        label="工会"
        :value="value"
        placeholder="选择工会"
        @click="showPicker = true"
      />
      <van-cell>
        <van-uploader :after-read="afterRead" />
      </van-cell>
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
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
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
      signname: "",
      address: "",
      addressInfo: "",
      showAddress: false,
      // 当前选中的省市区code
      areaNum: "",
      // 省市区列表
      areaList: addressList,
      // 工会
      value: "",
      showPicker: false,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({ path: "/person" });
    },
    // 上传文件
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      window.console.log(file);
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