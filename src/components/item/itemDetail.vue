<template>
  <div id="itemDetail">
    <!-- navbar -->
    <van-nav-bar :title="itemDetailData.post_title" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 图文 -->
    <div id="detailBox">
      <div id="title" class="left font_h1 titleh1">{{itemDetailData.post_title}}</div>
      <div id="titleInfo" class="pd">
        <van-col span="12" class="left h_titles">{{itemDetailData.published_time |dCreateTime}}</van-col>
        <van-col span="12" class="right h_titles">{{itemDetailData.post_source}}</van-col>
      </div>
      <van-divider />
      <div id="content"  class="pd" v-html="itemDetailData.post_content"></div>
    </div>
    <tabbar name="home" />
  </div>
</template>
<script>
import tabbar from "../../components/common/tabbar";
export default {
  components: {
    tabbar
  },
  mounted() {
    let id = this.$route.query.newId; //home 携带过来的新闻id
    window.console.log(id);
    let that = this;
    this.axios
      .post("/portal/categories/get_new", {
        id: id
      })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.itemDetailData = res.data.data.list;
        }
      });
  },
  data() {
    return {
      itemDetailData: {}
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
#detailBox {
  /* padding: 0 1rem; */
  background: #fff;
}
.pd{
  padding: 0 16px;
  box-sizing: border-box;
}
#content {
  /* height: calc(100vh - 10rem); */
  width: 100%;
  overflow: hidden;
  margin-bottom: 50px;
}
/* #title {
  font-size: 1.5rem;
} */
#titleInfo {
  display: flex;
  /* height: 3rem; */
  align-items: center;
}
.titleh1 {
  font-size: 16px;
  text-align: center;
  padding: 10px 0;
}
#titleInfo > .time {
  flex: 1;
}
.bottomBox {
  height: 2rem;
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 50px;
  width: 100%;
  background: #fff;
}
</style>