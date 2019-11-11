<template>
  <div id="itemList">
    <!-- navbar -->
    <van-nav-bar title="itemList" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- list列表 -->
    <van-row>
      <van-list>
        <van-panel>
          <div
            slot="default"
            class="pannel-default"
            @click="itemDetail(item.id)"
            v-for="item in listData"
            :key="item.id"
          >
            <van-row>
              <van-col offset="1" span="13" class="left">{{item.post_title}}</van-col>
              <van-col span="10">
                <img :src="resourse+item.thumbnail" alt height="50px" />
              </van-col>
            </van-row>
            <van-row>
              <van-col offset="1" span="13" class="left">{{item.published_time|dCreateTime}}</van-col>
            </van-row>
          </div>
        </van-panel>
      </van-list>
    </van-row>
  </div>
</template>
<script>
import global from "../../global";
export default {
  mounted() {
    let id = this.$route.query.categoryId; //home 携带过来的分类id
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