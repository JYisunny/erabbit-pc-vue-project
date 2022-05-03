import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () =>
  import('@/views/Layout')
const Home = () =>
  import('@/views/home')
const TopCategory = () =>
  import('@/views/category/index')
const SubCategory = () =>
  import('@/views/category/sub')
const Goods = () =>
  import('@/views/goods/index')
const Login = () =>
  import('@/views/login')
const LoginCallback = () =>
  import('@/views/login/callback')
const Cart = () =>
  import('@/views/cart')

// 路由规则
const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [{ path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart }
    ]
  },
  { path: '/login', component: Login },
  { path: '/login/callback', component: LoginCallback }
]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例

const router = createRouter({
  // 使用 hash的路由模式
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置(每次切换路由时,滚动到页面顶部)
    // vue2.0 x y 控制 // vue3.0 left top 控制
    return { left: 0, top: 0 }
  }
})

export default router
