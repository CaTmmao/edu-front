import axios from "axios";
import cookie from "js-cookie";
import {Message} from 'element-ui'

const service = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

// 设置拦截器
service.interceptors.request.use(
  config => {
    if (cookie.get('token')) {
      // 把cookie值放入header
      config.headers['token'] = cookie.get('token')
    }
    return config
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.message !== 'success') {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //     // to re-login
      //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //         confirmButtonText: 'Re-Login',
      //         cancelButtonText: 'Cancel',
      //         type: 'warning'
      //     }).then(() => {
      //         store.dispatch('user/resetToken').then(() => {
      //             location.reload()
      //         })
      //     })
      // }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error)
    let {response} = error

    // 获取后端返回的响应
    if (response && response.data && response.data.message) {
      console.error(response)
      Message({
        message: response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      console.error(error)
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service