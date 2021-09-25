<template>
  <div class="ml10 mr10 pt20">
    <div>
      <comment
        @doSend="doSend($event)"
        :commentList="commentList"
        :commentNum="commentNum"
        :avatar="userInfo.avatar"
        :placeholder="placeholder"
        :minRows="minRows"
        :maxRows="maxRows"
      ></comment>
    </div>
  </div>
</template>

<script>
import Comment from "hbl-comment";
import comment from "@/api/comment";
import cookie from "js-cookie";

export default {
  props: ['courseId'],
  data() {
    return {
      teacherId: '',
      token: "",
      userInfo: {
        id: "",
        avatar: "",
        nickname: "",
      },
      placeholder: "说点什么吧",
      minRows: 4,
      maxRows: 4,
      commentNum: 0,
      commentList: [],
    };
  },
  components: {
    Comment,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.token = cookie.get("token");
      let userInfo = cookie.get("user_info");

      // 转为json对象
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo);
      }
    },
    // 获取评论信息
    getComment() {
      comment.getComment(this.courseId).then((result) => {
        let val = result.data;
        this.commentList = [];
        this.commentNum = val.length;
        for (let i = 0; i < val.length; i++) {
          this.commentList.push({
            commentUser: {
              id: val[i].id,
              nickName: val[i].nickname,
              avatar: val[i].avatar,
            },
            content: val[i].content,
            createDate: val[i].createTime
          });
        }
      });
    },
    // 添加评论
    saveComment(info) {
      if (!this.token) {
        this.$message({
          type: "error",
          message: "请先登录",
        });
      } else {
        comment.saveComment(info).then(() => {
          this.$message({
            type: "success",
            message: "评论成功",
          });
          this.getComment();
        });
      }
    },
    doSend(content) {
      let info = {
        courseId: this.courseId,
        teacherId: this.teacherId,
        content,
      };
      this.saveComment(info);
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.reply-fa {
  display: none;
}
</style>
