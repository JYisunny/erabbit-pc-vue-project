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

/**
 * 合并购物车
 * @param {Array<object>} cartList - 购物车信息列表
 * @param {String} object.skuId - SkuId
 * @param {Boolean} object.selected - 选中状态
 * @param {Integer} object.count - 数量
 * @returns
 */
export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

/**
 * 获取购物车列表
 * @returns
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}

/**
 * 加入购物车
 * @param {String} object.skuId - SkuId
 * @param {Integer} object.count - 加入购物车的数量
 * @returns
 */
export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * 删除购物车商品，支持批量删除
 * @param {Array<String>} ids - skuId 的集合
 * @returns
 */
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}

/**
 * 修改购物车商品（状态，数量）
 * @param {String} skuId - skuId
 * @param {Integer} count - 加入购物车的数量
 * @param {Boolean} selected - 选中状态
 * @returns
 */
export const updateCart = ({ skuId, selected, count }) => {
  return request(`/member/cart/${skuId}`, 'put', { skuId, selected, count })
}

/**
 * 全部选中 & 取消全选
 * @param {Boolean} selected - 选中状态
 * @param {Array<String>} ids - skuId 的集合
 * @returns
 */
export const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}
