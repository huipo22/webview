<template>
  <div id="moreCategory">
    <!-- navbar -->
    <van-nav-bar title="更多分类" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 分类 -->
    <!-- category -->
    <van-row class="m_bottom pageSetting" v-for="item in listData" :key="item.id">
      <van-row>
        <van-col>{{item.name}}</van-col>
      </van-row>
      <van-grid :column-num="5">
        <van-grid-item
          v-for="item1 in item.children"
          :key="item1.id"
          :icon="resourse+item1.more['thumbnail']"
          :text="item1.name"
        />
      </van-grid>
    </van-row>
  </div>
</template>
<script>
import global from "../../global";
export default {
  data() {
    return {
      listData: [],
      resourse: global.imgAddress
    };
  },
  mounted() {
    let that = this;
    this.axios.get("/portal/categories/cate_list").then(res => {
      window.console.log(res);
      if (res.data.code == 1) {
        that.listData = res.data.data.list;
      }
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>