// 用户相关的接口

import request from '@/utils/request'

/**
 * 账号密码登录
 * @param {String} account - 账号
 * @param {String} password - 密码
 * @returns Promise
 */
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

/**
 * 获取手机短信验证码
 * @param {String} mobile - 手机号
 * @returns Promise
 */
export const userMobileLoginMsg = (mobile) => {
  return request('/login/code', 'get', { mobile })
}

/**
 * 手机验证码登录
 * @param {String} mobile - 手机号
 * @param {String} code - 短信验证码
 * @returns Promise
 */
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}
