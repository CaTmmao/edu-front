import request from '@/utils/request'

// 接口前缀
const urlPrefix = 'service/category'

export default {
    /**
     * 获取包含子分类的分类列表
     * @return {AxiosPromise} 包含子分类的分类列表
     */
    getAllCategoryList() {
        return request({
            url: `${urlPrefix}/all`,
            method: 'get'
        })
    }
}
