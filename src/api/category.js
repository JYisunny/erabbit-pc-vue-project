// 定义分类相关的 API接口函数
import request from '@/utils/request'

/**
 * 获取所有分类 (顶级，二级，对应的商品推荐数据)
 * @returns Promise
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 * 获取顶级类目信息(children属性是 各个子分类)
 * @param {String} id - 顶级类目ID
 * @returns
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

/**
 * 获取二级类目的筛选条件数据
 * @param {String} id - 二级类目ID
 * @returns
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}
