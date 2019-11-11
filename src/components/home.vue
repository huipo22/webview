<template>
  <div id="home">
    <!-- navbar -->
    <van-nav-bar title="首页"></van-nav-bar>
    <!-- swipter -->
    <van-swipe :autoplay="3000" class="swiperImg">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- category -->
    <van-row class="m_bottom">
      <van-grid :column-num="5">
        <van-grid-item
          v-for="item in categoryList.list"
          :key="item.id"
          :icon="resourse+item.more['thumbnail']"
          :text="item.name"
        />
        <van-grid-item text="问答广场" @click="questionAll" />
        <van-grid-item text="更多" @click="moreCategory" />
      </van-grid>
    </van-row>
    <!-- 通知 -->
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">通知内容</van-notice-bar>
    <!-- category_detail -->
    <van-row>
      <van-list>
        <van-panel v-for="item in newList.list" :key="item.id">
          <div slot="header" class="pannel-head">
            <van-col span="6">{{item.name}}</van-col>
            <van-col offset="14" span="4" @click="moreList(item.id)">更多</van-col>
          </div>
          <div
            slot="default"
            class="pannel-default"
            @click="itemDetail(item.new.id)"
            v-if="item.new"
          >
            <van-row>
              <van-col offset="1" span="13" class="left title">{{item.new.post_title}}</van-col>
              <van-col span="10">
                <image :src="resourse+item.more['thumbnail']" alt height="50px" />
              </van-col>
            </van-row>
            <van-row>
              <van-col offset="1" span="13" class="left">{{item.new.create_time |dCreateTime}}</van-col>
            </van-row>
          </div>
        </van-panel>
      </van-list>
    </van-row>
  </div>
</template>
<script>
import global from "../global";
export default {
  data() {
    return {
      active: "home",
      resourse: global.imgAddress,
      categoryList: [], //分类组合
      newList: [], //新闻list
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  },
  mounted() {
    let that = this;
    this.axios.get("/portal/categories").then(res => {
      window.console.log(res);
      if (res.data.code == 1) {
        that.categoryList = res.data.data;
      }
    });
    this.axios.get("/portal/categories/new_list").then(res => {
      window.console.log(res);
      if (res.data.code == 1) {
        that.newList = res.data.data;
      }
    });
  },
  methods: {
    getHome() {},
    // 详情
    itemDetail(id) {
      window.console.log(id);
      this.$router.push({ path: "/itemDetail?newId=" + id });
    },
    // 全部问答
    questionAll() {
      this.$router.push({ path: "/questionAll" });
    },
    // 更多分类
    moreCategory() {
      this.$router.push({ path: "/moreCategory" });
    },
    // 分类更多
    moreList(id) {
      this.$router.push({ path: "/itemList?categoryId=" + id });
    }
  }
};
</script>
<style  scoped>
.title {
  height: 3.5rem;
}
.m_bottom {
  margin-bottom: 1rem;
}

.pannel-head {
  height: 2rem;
  display: flex;
  align-items: center;
}
.pannel-default {
  height: 5rem;
}
</style>