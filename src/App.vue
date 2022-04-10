<template>
  <div class="container">
    <!-- 1.1 使用 A模块中 state数据 -->
    <p>{{ $store.state.moduleA.username }}</p>
    <!-- 1.2 使用 A模块中 getters数据 -->
    <p>{{ $store.getters.newName }}</p>

    <!-- 2.1 使用 B模块中 state数据 -->
    <p>{{ $store.state.moduleB.username }}</p>
    <!-- 2.2 使用 B模块中 getters数据 -->
    <p>{{ $store.getters['moduleB/newName'] }}</p>
    <button @click="mutationsFn">mutationsFn</button>
    <button @click="actionsFn">actionsFn</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    const store = useStore()
    const mutationsFn = () => {
      // 2.3 提交 B模块的修改
      store.commit('moduleB/updateName')
    }
    const actionsFn = () => {
      // 2.4 调用 B模块的actions
      store.dispatch('moduleB/updateName')
    }

    return { mutationsFn, actionsFn }
  }

}
</script>

<style>

</style>
