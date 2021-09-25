import request from "@/utils/request";

// 接口前缀
const urlprefix = '/user'

export default {
  // 登陆账户
  loginUser(userInfo) {
    return request({
      url: `${urlprefix}/login`,
      method: 'post',
      data: userInfo
    })
  },
  // 根据token获取用户信息
  getLoginUserInfo() {
    return request({
      url: urlprefix,
      method: 'get',
    })
  },
  // github登陆
  githubLogin() {
    return request({
      utl: '/login/github',
      method: 'get'
    })
  },
  // 保存用户信息
  updateUser(userInfo) {
    return request({
      url: `/edu-center`,
      method: 'put',
      data: userInfo
    })
  }
}
