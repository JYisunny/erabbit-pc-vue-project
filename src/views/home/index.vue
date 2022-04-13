<template>
  <div class="container">
    <!-- 首页入口 (分类 + 广告) -->
    <div class="home-entry">
      <!-- 左侧分类 -->
      <HemeCategory />
      <!-- 轮播图 -->
    </div>
  </div>
</template>

<script>
import HemeCategory from './components/home-category'

export default {
  name: 'HomePage',
  components: {
    HemeCategory
  }
}
</script>

<style lang="less" scoped>
  // .container {
  //   .hoverShadow();
  //   color: @xtxColor;
  // }
</style>
