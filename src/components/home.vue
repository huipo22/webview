<template>
  <div id="home">
    <!-- 遮罩层 -->
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="block">{{showText}}</div>
      </div>
    </van-overlay>
    <!-- navbar -->
    <van-nav-bar title="云工会"></van-nav-bar>
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
    <van-row class="m_bottom">
      <!-- <van-notice-bar :text="notify" left-icon="volume-o" class="m_bottom" :scrollable="true" /> -->

      <div class="marquee_box">
        <ul class="marquee_list" :style="{ top: -num + 'px'}" :class="{marquee_top:num}">
          <!-- 当显示最后一条的时候（num=0转换布尔类型为false）去掉过渡效果-->
          <li v-for="(item, index) in marqueeList" :key="index">
            <router-link to="/love" class="link">
              <div>{{item.post_excerpt}}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </van-row>
    <!-- category_detail -->
    <van-row>
      <van-list>
        <van-panel v-for="item in newList.list" :key="item.id">
          <div slot="header" class="pannel-head">
            <!-- <van-col>{{url}}</van-col> -->
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
            <!-- <van-row>
              <van-col span="24">
                <img :src="resourse+item.new.thumbnail" alt width="100%" />
              </van-col>
            </van-row>-->
            <van-row>
              <van-col offset="1" span="16" class="left h_content">{{item.new.post_title}}</van-col>
              <van-col span="6">
                <img :src="resourse+item.new.thumbnail" alt height="50px" />
              </van-col>
            </van-row>
            <van-row class="pageSetting">
              <van-col span="13" class="left h_titles">{{item.new.create_time |dCreateTime}}</van-col>
              <van-col span="10" class="right h_titles">{{"来源:"+item.new.post_source}}</van-col>
            </van-row>
          </div>
        </van-panel>
      </van-list>
    </van-row>
    <!-- 栏目1 -->
    <van-row class="dividers m-top">
      <van-col span="24">为你推荐</van-col>
      <van-col style="position: absolute;
    right: 6%;">
        <router-link to="/love" style="color:#1989fa">更多</router-link>
      </van-col>
    </van-row>
    <div class="love">
      <div class="gridBox">
        <van-grid :border="false" :column-num="5" class="firstBox">
          <van-grid-item
            v-for="item in tagList.slice(0,5)"
            :key="item.id"
            @click="shop(item.id)"
            :icon="resourse+item.img"
            :text="item.name"
          >
            <!-- <van-image :src="resourse+item.img" />
            <div class="itemName">{{item.name}}</div>-->
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 栏目1 -->
    <van-row class="dividers m-top">
      <van-col span="24">问答广场</van-col>
      <van-col style="position: absolute;
    right: 6%;">
        <router-link to="/questionAll" style="color:#1989fa">更多</router-link>
      </van-col>
    </van-row>
    <van-row>
      <!-- 问题内容 -->
      <van-row class="marginBox">
        <van-list v-for="item in questionAll.slice(0,3)" :key="item.id">
          <van-panel class="questionList" @click="questionDetail(item.id)">
            <div slot="header" class="pannel-header">
              <van-row>
                <van-col v-html="item.content" style="font-weight:bold"></van-col>
              </van-row>
            </div>
            <div slot="default" class="pannel-default">
              <van-row>
                <van-col class="userInfo">
                  <div>
                    <img class="avatar" width="30px" height="30px" :src="item.user_info.avatar" />
                  </div>
                  <div
                    class="name h_titles"
                  >{{!item.user_info.user_nickname?'游客':item.user_info.user_nickname}}</div>
                  <div class="name h_titles" style="padding: 0;">{{item.count}}条回答</div>
                  <div class="time h_titles">{{item.user_info.create_time |dCreateTime}}</div>
                </van-col>
              </van-row>
            </div>
          </van-panel>
        </van-list>
      </van-row>
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
import MarqueeTips from "vue-marquee-tips";
export default {
  components: {
    tabbar,
    MarqueeTips
  },
  data() {
    return {
      active: "home",
      num: 0,
      marqueeList: [],
      activeIndex: 0,
      resourse: global.imgAddress,
      categoryList: [], //分类组合
      newList: [], //新闻list
      notify: "", //通知
      images: [],
      show: false,
      showText: "",
      questionAll: [],
      tagList: []
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
      this.axios
        .get("/home/forum/index", {
          headers: {
            "Device-Type": global.deviceType,
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(sessionStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
            that.questionAll = res.data.data;
          } else {
            Toast.fail(res.data.msg);
          }
        });
      this.axios
        .get("/goods/goods/get_type", {
          headers: {
            "Device-Type": global.deviceType,
            token: JSON.parse(sessionStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
            that.tagList = res.data.data;
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
  },
  created() {
    let that = this;
    this.axios.get("/portal/categories/get_notice").then(res => {
      if (res.data.code == 1) {
        that.marqueeList = res.data.data;
        that.showMarquee(this.num);
      }
    });
  },
  methods: {
    showMarquee: function(num) {
      this.marqueeList.push(this.marqueeList[0]);
      var max = this.marqueeList.length;
      var that = this;
      var marqueetimer = setInterval(function() {
        num++;
        if (num >= max) {
          num = 0;
        }
        that.num = num * 30;
      }, 2000);
    },
    love() {
      this.$router.push("/love");
    },
    shop(id) {
      this.$router.push("/love/shop?shopId=" + id);
    },
    getHome() {},
    // 详情
    itemDetail(id) {
      window.console.log(id);
      this.$router.push({ path: "/itemDetail?newId=" + id });
    },
    // 全部问答
    // 更多分类
    moreCategory(cateId, name) {
      if (cateId == "8") {
        this.$router.push({ path: "/itemDetail?newId=1030" });
      } else {
        this.$router.push({
          path: "/moreCategory?cateId=" + cateId + "&cateName=" + name
        });
      }
    },
    // 分类更多
    moreList(id, title) {
      this.$router.push({
        path: "/itemList?categoryId=" + id + "&title=" + title
      });
    },
    questionDetail(id) {
      this.$router.push({ path: "/questionDetail?questionId=" + id });
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
/* .van-list {
  margin-bottom: 50px;
} */
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
.marquee {
  background: #f90;
  padding: 5px 15px;
  font-size: 14px;
  text-align: left;
}
.link {
  color: #fff;
}
.marginBox {
  margin-bottom: 50px;
}
.dividers {
  background: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 13px;
  position: relative;
}
.m-top {
  margin-top: 0.5rem;
}
.marquee {
  width: 100%;
  height: 50px;
  align-items: center;
  color: #3a3a3a;
  background-color: aqua;
  display: flex;
  box-sizing: border-box;
}
.marquee_title {
  padding: 0 20px;
  height: 30px; /*关键样式*/
  font-size: 14px;
  border-right: 1px solid #d8d8d8;
  align-items: center;
}

.marquee_box {
  display: block;
  position: relative;
  width: 100%;
  height: 30px; /*关键样式*/
  overflow: hidden;
}
.marquee_list {
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.marquee_top {
  transition: top 0.5s;
} /*关键样式*/
.marquee_list li {
  height: 30px; /*关键样式*/
  line-height: 30px; /*关键样式*/
  font-size: 14px;
  padding-left: 20px;
  background-color: #f90;
  text-align: left;
}
</style>