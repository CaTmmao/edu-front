import request from "@/utils/request";

// 接口前缀
const urlPrefix = 'service/comment'

export default {
  // 获取评论信息
  getComment(courseId) {
    return request({
      url: `${urlPrefix}/${courseId}`,
      method: 'get'
    })
  },
  // 添加评论信息
  saveComment(commentInfo) {
    return request({
      url: urlPrefix,
      method: 'post',
      data: commentInfo
    })
  }
}
