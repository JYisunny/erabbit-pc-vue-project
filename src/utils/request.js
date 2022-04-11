// 1. 创建新的 axios实例
// 2. 请求拦截器， 如果有 token进行头部携带
// 3. 响应拦截器: 1. 剥离无效数据   2. 处理 token失效
// 4. 导出一个函数， 调用当前的 axios实例发请求， 返回值 promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址， 原因: 其他地方不是通过 axios发请求的地方也要用到基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  // axios 一些配置， baseURL  timeout
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use((config) => {
  // 拦截业务逻辑
  // 进行请求配置的修改
  // 如果本地有 token就在头部携带
  // 1. 获取用户信息对象
  const { profile } = store.state.user
  // 2. 判断是否有 token
  if (profile.token) {
    // 3. 设置 token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// res => res.data  取出 data数据， 将来调用接口时，拿到的就是后台的数据
instance.interceptors.response.use(res => res.data, err => {
  // 401 状态码， 登陆无效 进入该函数
  if (err.response && err.response.status === 401) {
    // 1. 清空无效用户信息
    // 2. 跳转到登录页面
    // 3. 跳转需要传参 (当前路由地址) 给登录页
    store.commit('user/setUser', {})
    // 当前路由地址
    // 组件里头: `/user?a=10&b=20`  $route.path => /user         $toute.fullPath => /user?a=10
    // js模块中: router.currentRoute.value.fullPath  就是当前路由地址,
    // router.currentRoute  是ref响应式数据(vue3.x) => (想拿数据必须加.value)
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath) // uri转码(%形式) 防止解析地址出问题
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求， 请求地址， 请求方式， 提交的数据
  return instance({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递 submitData    ?a=10&c=20
    // 2. 如果不是get请求  需要使用data来传递 submitData    请求体传参
    // const a = {name:100} a.name a['name']  a[10 > 9 ? 'name' : 'age']
    // [] 设置一个动态 key， 写js表达式， js表达式的执行结果当做 KEY
    // method参数: get, Get, GET    转化成小写再来判断
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
