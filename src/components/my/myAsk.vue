<template>
  <div id="myAsk">
    <!-- navbar -->
    <van-nav-bar
      title="我的回答"
      left-arrow
      @click-left="onClickLeft"
      right-text="提交"
      @click-right="onClickRight"
    ></van-nav-bar>
    <div class="edit_container">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import global from "../../global";
export default {
  data() {
    return {
      content: null,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗、倾斜、下划线、删除线
            [{ header: 1 }, { header: 2 }], // 标题一、标题二
            [{ list: "ordered" }, { list: "bullet" }], // 列表
            [{ color: [] }, { background: [] }], // 字体颜色、背景颜色
            ["link", "image"]
          ]
        }
      } //配置
    };
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      let that = this;
       let id = this.$route.query.questionId;
      let params = this.qs.stringify({
        content: this.content,
        question_id:id
      });
      this.axios
        .post("/home/forum/add_answer", params, {
          headers: {
            "Device-Type": global.deviceType,
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(sessionStorage.getItem("userInfo")).token
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code == 1) {
            that.$router.push({ path: "/myQuestion" });
          } else {
            Toast.fail(res.data.msg);
          }
        });
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
      window.console.log(this.content);
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  components: {
    quillEditor
  }
};
</script>