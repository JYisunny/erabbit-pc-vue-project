import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入自己UI组件库
import UI from '@/components/library'

// 1. 重置样式库
import 'normalize.css'
// 2. 自己项目的重置样式和公用样式
import '@/assets/styles/common.less'

// mockjs(模拟后台接口数据) // 入后台给了接口，则注释下方
import '@/mock'

createApp(App).use(store).use(router).use(UI).mount('#app')
