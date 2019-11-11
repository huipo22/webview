<template>
  <div id="itemDetail">
    <!-- navbar -->
    <van-nav-bar title="itemDetail" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 图文 -->
    <div id="detailBox">
      <div id="title" class="left">{{itemDetailData.post_title}}</div>
      <div id="titleInfo">
        <div class="left">{{itemDetailData.published_time |dCreateTime}}</div>
        <div class="readtime">需要时间</div>
      </div>
      <div id="content" v-html="itemDetailData.post_content">
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
  padding: 0 1rem;
  background: #fff;
}
#content {
  height: calc(100vh - 10rem);
}
#title {
  font-size: 1.5rem;
}
#titleInfo {
  display: flex;
  height: 3rem;
  align-items: center;
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