<template>
  <div id="moreCategory">
    <!-- navbar -->
    <van-nav-bar title="新闻分类" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- swipter -->
    <van-swipe :autoplay="3000" class="swiperImg">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="resourse+image.url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 分类 -->
    <!-- category -->
    <van-row class="h_title" v-for="item in listData" :key="item.id">
      <van-row>
        <van-col offset="1">{{item.name}}</van-col>
      </van-row>
      <van-grid :column-num="4">
        <van-grid-item
          v-for="item1 in item.children"
          :key="item1.id"
          :icon="resourse+item1.more['thumbnail']"
          :text="item1.name"
          @click="moreList(item1.id,item1.name)"
        />
      </van-grid>
      <van-row class="bgcolor"></van-row>
    </van-row>
  </div>
</template>
<script>
import global from "../../global";
export default {
  data() {
    return {
      listData: [],
      resourse: global.imgAddress,
      images: []
    };
  },
  mounted() {
    let that = this;
    //轮播图
    this.axios.get("home/index/get_swipe?swipe_id=2").then(res => {
      if (res.data.code == 1) {
        that.images = res.data.data;
      }
    });
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
    },
    // 分类更多
    moreList(id, title) {
      this.$router.push({
        path: "/itemList?categoryId=" + id + "&title=" + title
      });
    }
  }
};
</script>
<style scoped>
.bgcolor {
  height: 0.5rem;
  background: #f0f3f6;
}
.h_title {
  font-size: 16px;
}
</style>