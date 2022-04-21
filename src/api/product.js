// 提供商品相关的 API函数

import request from '@/utils/request'

/**
 *
 * @param {String} id - 商品ID
 * @returns Promise
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
