import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import store from '@/store'
import { h } from 'vue'

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

const Checkout = () =>
  import('@/views/member/pay/checkout')
const pay = () =>
  import('@/views/member/pay')
const payResult = () =>
  import('@/views/member/pay/result')

const MemberLayout = () =>
  import('@/views/member/Layout')
const MemberHome = () =>
  import('@/views/member/home')
const MemberOrder = () =>
  import('@/views/member/order')
const MemberOrderDetail = () =>
  import('@/views/member/order/detail')

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
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: Checkout },
      { path: '/member/pay', component: pay },
      { path: '/pay/callback', component: payResult },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome },
          // { path: '/member/order', component: MemberOrder },
          // { path: '/member/order/:id', component: MemberOrderDetail }
          {
            path: '/member/order',
            // 创建一个RouterView容器形成嵌套关系
            // component: { render: () => h(<RouterView />) },
            component: { render: () => h(RouterView) },
            children: [
              { path: '', component: MemberOrder },
              { path: '/member/order/:id', component: MemberOrderDetail }
            ]
          }
        ]
      }
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

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 需要登录的路由：地址是以 /member 开头
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
