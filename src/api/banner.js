import request from '@/utils/request'

// 接口前缀
const urlPrefix = 'service/banner'

export default {

  /**
   * 首页显示的banner列表
   * @return {AxiosPromise} banner列表
   */
  getIndexPageBannerList() {

    return request({
      url: urlPrefix + '/front/index/list',
      method: 'get'
    })
  }
}
