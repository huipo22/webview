<template>
  <div id="home">
    <!-- 遮罩层 -->
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="block">{{showText}}</div>
      </div>
    </van-overlay>
    <!-- navbar -->
    <van-nav-bar title="首页"></van-nav-bar>
    <!-- swipter -->
    <van-swipe :autoplay="3000" class="swiperImg">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="resourse+image.url" />
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
          @click="moreCategory(item.id,item.name)"
        />
        <van-grid-item icon="ellipsis" text="更多" @click="moreCategory('all','新闻分类')" />
      </van-grid>
    </van-row>
    <!-- 通知 -->
    <van-row>
      <van-notice-bar :text="notify" left-icon="volume-o" class="m_bottom" :scrollable="true" />
    </van-row>
    <!-- category_detail -->
    <van-row>
      <van-list>
        <van-panel v-for="item in newList.list" :key="item.id" class="m_bottom">
          <div slot="header" class="pannel-head">
            <van-col span="5" offset="1" class="font_h1 h_titles">{{item.name}}</van-col>
            <van-col
              offset="15"
              span="3"
              @click="moreList(item.id,item.name)"
              class="font_h1 h_titles h_titlescolor"
            >更多</van-col>
          </div>
          <div
            slot="default"
            class="pannel-default"
            @click="itemDetail(item.new.id)"
            v-if="item.new"
          >
            <van-row>
              <van-col span="24">
                <img :src="resourse+item.new.thumbnail" alt width="100%" />
              </van-col>
            </van-row>
            <van-row>
              <van-col offset="1" span="23" class="left h_content">{{item.new.post_title}}</van-col>
              <!-- <van-col span="7">
                <img :src="resourse+item.new.thumbnail" alt height="50px" />
              </van-col>-->
            </van-row>
            <!-- <van-row>
              <van-col
                offset="1"
                span="13"
                class="left h_titles"
              >{{item.new.create_time |dCreateTime}}</van-col>
            </van-row>-->
          </div>
        </van-panel>
      </van-list>
    </van-row>
    <tabbar name="home" v-if="!show" />
  </div>
</template>
<script>
import Vue from "vue";
import { NoticeBar, Toast } from "vant";
Vue.use(NoticeBar);
import global from "../global";
import tabbar from "../components/common/tabbar";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      active: "home",
      resourse: global.imgAddress,
      categoryList: [], //分类组合
      newList: [], //新闻list
      notify: "", //通知
      images: [],
      show: false,
      showText: ""
    };
  },
  mounted() {
    let token = this.$route.query.token;
    if (!token) {
      Toast.fail("Token值没有");
      // this.$router.replace({ path: "/login" });
    } else {
      sessionStorage.setItem("userInfo", JSON.stringify({ token: token }));
      // get 基本信息
      let that = this;
      this.axios
        .get("/user/profile/userInfo", {
          headers: {
            "Device-Type": global.deviceType,
            token: JSON.parse(sessionStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            let user = res.data.data;
            window.console.log(user);
            if (!user.user_nickname || !user.signature || !user.address) {
              this.$router.replace({ path: "/baseInfo?new=0" });
            } else if (user.user_status == 2) {
              that.show = true;
              that.showText = "审核中";
            } else if (user.user_status == 0) {
              that.show = true;
              that.showText = "已拉黑";
            }
          } else {
            Toast.fail("Token值错误");
          }
        });
    }
    let that = this;
    //轮播图
    this.axios.get("home/index/get_swipe?swipe_id=1").then(res => {
      if (res.data.code == 1) {
        that.images = res.data.data;
      }
    });
    // 大类
    this.axios.get("/portal/categories").then(res => {
      // window.console.log(res);
      if (res.data.code == 1) {
        that.categoryList = res.data.data;
      }
    });
    // 新闻list
    this.axios.get("/portal/categories/new_list").then(res => {
      // window.console.log(res);
      if (res.data.code == 1) {
        that.newList = res.data.data;
      }
    });
    this.axios.get("/portal/categories/get_notice").then(res => {
      if (res.data.code == 1) {
        that.notify = res.data.data;
      }
    });
  },
  methods: {
    love() {
      this.$router.push("/love");
    },
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
    moreCategory(cateId,name) {
      this.$router.push({ path: "/moreCategory?cateId="+cateId +"&cateName="+name});
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
<style  scoped>
#home {
  background: #f0f3f6;
}
.title {
  height: 3rem;
  font-size: 0.5rem;
  display: flex;
  align-items: center;
}
.h_titles {
  font-size: 12px;
  color: #7d7e80;
  text-align: left;
}
.h_titlescolor {
  color: #1989fa;
}
.h_content {
  font-size: 16px;
  /* color: #1989fa; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.font {
  font-size: 0.5rem;
}
.m_bottom {
  margin-bottom: 0.5rem;
}
.van-list {
  margin-bottom: 50px;
}
.pannel-head {
  height: 2rem;
  display: flex;
  align-items: center;
}
.pannel-default {
  /* height: 8rem; */
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 150px;
  height: 150px;
  background-color: #75a6d8;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #fff;
}
</style>