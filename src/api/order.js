import request from "@/utils/request";

// 接口前缀
const urlPrefix = '/service/order'

export default {
  // 创建订单
  createOrder(courseId) {
    return request({
      url: `${urlPrefix}/${courseId}`,
      method: 'post'
    })
  },

  // 查询订单
  getOrderInfo(orderNo) {
    return request({
      url: `${urlPrefix}/${orderNo}`,
      method: 'get'
    })
  },
  // 更新订单状态为已支付
  updateOrder(orderNo) {
    return request({
      url: `${urlPrefix}/${orderNo}`,
      method: 'patch'
    })
  },
  // 根据课程id和用户id查询
  isBuyCourse(courseId) {
    return request({
      url: `/order/order/course-status/${courseId}`,
      method: 'get'
    })
  }
}
