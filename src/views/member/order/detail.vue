<template>
  <div class="member-order-detail" v-if="order">
    <!-- 头部 -->
    <OrderDetailAction :order="order" />
    <!-- 进度 -->
    <DetailStep :order="order" />
    <!-- 物流 -->
    <!-- 信息 -->
  </div>
</template>

<script>
import { ref } from 'vue'
import OrderDetailAction from './components/detail-action'
import DetailStep from './components/detail-step'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
export default {
  name: 'MemberDetail',
  components: { OrderDetailAction, DetailStep },
  setup () {
    const route = useRoute()
    const order = ref(null)
    findOrderDetail(route.params.id).then((data) => {
      order.value = data.result
    })
    return { order }
  }
}
</script>

<style lang="less" scoped>
.member-order-detail {
  background: #fff;
  height: 100%;
}
</style>
