// 扩展 vue原有功能: 全局组件, 自定义指令, 挂在原型方法, 注意: 没有全局过滤器
// 这就是插件
// vue2.0插件写法要素: 导出一个对象, 有 install函数, 默认传入 Vue构造函数, 在Vue基础上扩展
// vue3.0插件写法要素: 导出一个对象, 有 install函数, 默认传入 app应用实例, app基础上扩展

import defaultImg from '@/assets/images/200.png'
// import XtxSkeleton from './xtx-skeleton'
// import XtxCarousel from './xtx-carousel'
// import XtxMore from './xtx-more'
// import XtxBread from './xtx-bread'
// import XtxBreadItem from './xtx-bread-item'

// 目的： 自动的批量注册组件。
// 1. 使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
// 2. 然后 context 函数会返回一个导入函数 importFn
// 3. 它又一个属性 keys() 获取所有的文件路径
// 4. 通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象
// 5. 遍历的同时进行全局注册即可

import Message from './Message'

// context(目录路径, 是否加载子目录, 加载文件的匹配在正则)
const importFn = require.context('./', false, /\.vue$/)
// console.log(importFn.keys()) // ["./xtx-bread-item.vue", "./xtx-bread.vue", "./xtx-carousel.vue", "./xtx-more.vue", "./xtx-skeleton.vue"]

export default {
  install (app) {
    // 在 app上进行扩展, app提供 component directive 函数
    // 如果挂在原型 app.config.globalProperties(.$http) 方式
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)

    // 根据keys批量注册
    importFn.keys().forEach(path => {
      // 导入组件
      const component = importFn(path).default
      // 进行注册
      app.component(component.name, component)
    })

    // 定义指令
    defineDirective(app)

    // 定义一个原型函数
    app.config.globalProperties.$message = Message
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
          // 4. 处理图片加载失败  error图片加载失败事件  load图片加载成功
          el.onerror = () => {
            // 加载失败, 设置默认图片
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
