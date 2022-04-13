import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () =>
  import('@/views/Layout')
const Home = () =>
  import('@/views/home')
const TopCategory = () =>
  import('@/views/category/index')
const SubCategory = () =>
  import('@/views/category/sub')

// 路由规则
const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [{ path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory }
    ]
  }
]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例

const router = createRouter({
  // 使用 hash的路由模式
  history: createWebHashHistory(),
  routes
})

export default router
