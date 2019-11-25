<template>
  <div id="itemList">
    <!-- navbar -->
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- list列表 -->
    <van-row style="margin-bottom:50px">
      <van-list>
        <div
          slot="default"
          class="pannel-default m_bottom"
          @click="itemDetail(item.id)"
          v-for="item in listData"
          :key="item.id"
        >
          <van-row>
            `
            <van-col span="24">
              <img :src="resourse+item.thumbnail" alt width="100%" />
            </van-col>
          </van-row>
          <van-row style="padding: 10px 0;">
            <van-col offset="1" span="23">
              <van-row class="left h_content">{{item.post_title}}</van-row>
              <!-- <van-row class="left h_titles">{{item.published_time|dCreateTime}}</van-row> -->
            </van-col>
            <!-- <van-col offset="2" span="8">
              <img :src="resourse+item.thumbnail" alt height="50px" />
            </van-col>-->
          </van-row>
          <van-row>
            <!-- <van-col offset="1" span="13" class="left h_titles">{{item.published_time|dCreateTime}}</van-col> -->
            <!-- <van-col offset="3" span="7" class="left h_titles">来源:{{item.post_source}}</van-col> -->
          </van-row>
        </div>
      </van-list>
    </van-row>
    <tabbar name="home" />
  </div>
</template>
<script>
import global from "../../global";
import tabbar from "../../components/common/tabbar";
export default {
  components: {
    tabbar
  },
  mounted() {
    let id = this.$route.query.categoryId; //home 携带过来的分类id
    this.title = this.$route.query.title;
    let that = this;
    this.axios
      .post("/portal/categories/get_newlist", { cate_id: id })
      .then(res => {
        window.console.log(res);
        if (res.data.code == 1) {
          that.listData = res.data.data.list;
        }
      });
  },
  data() {
    return {
      listData: [],
      title: "",
      resourse: global.imgAddress
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 详情
    itemDetail(id) {
      this.$router.push({ path: "/itemDetail?newId=" + id });
    }
  }
};
</script>
<style scoped>
#itemList {
  background: #f0f3f6;
}
.pannel-default {
  background: #fff;
}
</style>