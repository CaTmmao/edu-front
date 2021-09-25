import request from '@/utils/request'

// 接口前缀
const urlprefix = 'service/teacher'

export default {

  /**
   * 获取热门老师列表
   * @return {AxiosPromise} 热门老师列表
   */
  getHotTeacherList() {
    return request({
      url: `${urlprefix}/front/index/hot/list`,
      method: 'get',
    })
  },

  // 教师列表，条件查询，分页
  getTeacherListPage(pageNum, pageSize) {
    return request({
      url: `${urlprefix}/teachers/condition`,
      method: 'post',
      params: {
        pageNum,
        pageSize
      }
    })
  },
  
  // 根据讲师ID获取讲师信息
  getTeacherById(id) {
    return request({
      url: `${urlprefix}/${id}`,
      method: 'get'
    })
  }
}

