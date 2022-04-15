// 扩展 vue原有功能: 全局组件, 自定义指令, 挂在原型方法, 注意: 没有全局过滤器
// 这就是插件
// vue2.0插件写法要素: 导出一个对象, 有 install函数, 默认传入 Vue构造函数, 在Vue基础上扩展
// vue3.0插件写法要素: 导出一个对象, 有 install函数, 默认传入 app应用实例, app基础上扩展

import XtxSkeleton from './xtx-skeleton'
import XtxCarousel from './xtx-carousel'
import XtxMore from './xtx-more'
import defaultImg from '@/assets/images/200.png'

export default {
  install (app) {
    // 在 app上进行扩展, app提供 component directive 函数
    // 如果挂在原型 app.config.globalProperties(.$http) 方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    // 定义指令
    defineDirective(app)
  }
}

// 定义指令
const defineDirective = (app) => {
  // 1. 图片懒加载指令  v-lazy
  // 原理: 先存储图片地址不能在src上, 当图片进入可视区, 将你存储的图片地址设置给图片元素即可
  app.directive('lazy', {
    // vue2.0 监听使用指令的DOM是否创建好，钩子函数 inserted
    // vue3.0 指令拥有的钩子函数和组件一样，使用指令的DOM是否创建好，钩子函数: mounted
    mounted (el, binding) {
      // 2. 创建一个观察对象, 来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 进入可视区, 停止观察
          observe.unobserve(el)
          // 3. 将指令的值设置给 el的src属性  binding.value就是指令的值
          el.src = binding.value
          // 4. 处理图片加载失败  error图片加载失败事件  load图片加载成功
          el.onerror = () => {
            // 加载失败, 设置默认图片
            el.src = defaultImg
          }
        }
      }, {
        threshold: 0
      })
      observe.observe(el)
    }
  })
}
