import request from "@/utils/request";

// 接口前缀
const urlPrefix = 'service/course'

export default {
  // getCourseList(current, limit, conditions) {
  //   return request({
  //     url: `/eduservice/coursefront/getFrontCourseList/${current}/${limit}`,
  //     method: 'post',
  //     data: conditions
  //   })
  // },
  // // 查询所有分类
  // getAllSubject() {
  //   return request({
  //     url: `/eduservice/edu-subject/getAll`,
  //     method: 'get',
  //   })
  // },
  // getCourseInfo(id) {
  //   return request({
  //     url: `/eduservice/coursefront/getFrontCourseInfo/${id}`,
  //     method: 'get',
  //   })
  // },

  /**
   * 获取热门课程列表
   * @return {AxiosPromise} 热门课程列表
   */
  getHotCourseList() {

    return request({
      url: `${urlPrefix}/front/index/hot/list`,
      method: 'get',
    })
  },

  /**
   * 获取分页后的课程列表（可筛选条件及排序）
   * @param pageNum 当前第几页，从 1 开始
   * @param pageSize 每页条数
   * @param data 筛选条件
   * @return {AxiosPromise} 课程列表
   */
  getCourseListOfPageCondition(pageNum, pageSize, data) {
    return request({
      url: `${urlPrefix}/list/condition?pageSize=${pageSize}&pageNum=${pageNum}`,
      method: 'post',
      data
    })
  },

  // 根据讲师ID获取负责的课程列表
  getCourseListByTeacherId(teacherId) {
    return request({
      url: `${urlPrefix}/list`,
      method: 'get',
      params: {
        teacherId
      }
    })
  },

  // 查询所有课程分类
  getSubject() {
    return request({
      url: `/eduservice/subject`,
      method: 'get'
    })
  },

  // 查询课程详情信息
  getCourseDetailInfo(courseId) {
    return request({
      url: `${urlPrefix}/detail/${courseId}`,
      method: 'get'
    })
  }
}