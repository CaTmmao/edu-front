import request from "@/utils/request";

// 接口前缀
const urlprefix = '/user'

export default {
  // 注册发送邮件验证码
  sendMailCode(email) {
    return request({
      url: `/sms?email=${email}`,
      method: 'get'
    })
  },
  // 注册
  register(memberInfo) {
    return request({
      url: `${urlprefix}/register`,
      method: 'post',
      data: memberInfo
    })
  }
}
