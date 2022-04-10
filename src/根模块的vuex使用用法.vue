<template>
  <div>
    App
    <!-- 1. 使用根模块 state的数据 -->
    <p>{{ $store.state.username }}</p>
    <!-- 2. 使用根模块 getters的数据 -->
    <!-- <p>{{ $store.getters.newName }}</p> -->
    <p>{{ $store.getters['newName']}}</p>
    <button @click="mutationsFn">修改昵称</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    // 使用 vuex仓库
    const store = useStore()
    // 1. 使用根模块 state数据
    console.log(store.state.username)
    // 2. 使用根模块 getters数据
    console.log(store.getters.newName)
    const mutationsFn = () => {
      // 3. 提交根模块 mutations函数
      // store.commit('updateName')
      // 4. 调用根模块 actions函数
      store.dispatch('updateName')
    }

    return { mutationsFn }
  },
}
</script>

<style lang="less">
</style>
