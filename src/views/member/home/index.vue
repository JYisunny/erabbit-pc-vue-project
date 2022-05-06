<template>
  <div class="member-home">
    <!-- 概览 -->
    <MemberHomeOverview />
    <!-- 收藏 -->
    <MemberHomePanel title="我的收藏">
      <GoodsItem v-for="item in collectGoods" :key="item.id" :goods="item" />
    </MemberHomePanel>
    <!-- 足迹 -->
    <MemberHomePanel title="我的足迹">
      <GoodsItem v-for="item in browseHistoryGoods" :key="item.id" :goods="item" />
    </MemberHomePanel>
    <!-- 猜你喜欢 -->
    <GoodsRelevant />
  </div>
</template>

<script>
import MemberHomeOverview from './components/home-overview'
import MemberHomePanel from './components/home-panel'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
import GoodsItem from '@/views/category/components/goods-item'
import { findbrowseHistory, findCollect } from '@/api/member'
import { ref } from 'vue'

export default {
  name: 'MemberHome',
  components: { MemberHomeOverview, MemberHomePanel, GoodsRelevant, GoodsItem },
  setup () {
    const goods = {
      id: '1',
      name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
      picture: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
      desc: '清汤鲜香 红汤劲爽',
      price: '159.00'
    }

    // 调用我的收藏模拟接口
    const collectGoods = ref([])
    findCollect({ page: 1, pageSize: 4 }).then(data => {
      console.log(data)
      collectGoods.value = data.result.items
    })
    // 调用我的足迹模拟接口
    const browseHistoryGoods = ref([])
    findbrowseHistory({ page: 1, pageSize: 4 }).then(data => {
      console.log(data)
      browseHistoryGoods.value = data.result.pages.items
    })

    return { goods, collectGoods, browseHistoryGoods }
  }
}
</script>

<style lang="less" scoped>
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 10px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 10px;
}
</style>
