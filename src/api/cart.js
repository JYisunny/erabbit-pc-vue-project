// 封装购物车相关 API函数
import request from '@/utils/request'

/**
 * 获取最新购物车商品信息 ===> 最新价格 库存 是否有效
 * @param {String} skuId sku id(商品详情规格)
 * @returns
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品对应的 sku数据
 * @param {String} skuId - SKU id
 * @returns
 */
export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}
