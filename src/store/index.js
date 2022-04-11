import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

// 三个模块
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

export default createStore({
  modules: {
    cart,
    user,
    category
  },
  plugins: [
    // 默认存储在 loaclstorage
    createPersistedstate({
      // 本地存储名字
      key: 'erabbit-pc-vue-project-store',
      // 定制需要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
