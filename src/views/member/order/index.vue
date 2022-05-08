<template>
  <div class="member-order">
    <!-- jsx语法 -->
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
      </XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem v-for="item in orderList" :key="item.id" :order="item" />
    </div>
    <!-- 分页组件 -->
    <XtxPagination
      v-if="total > 0"
      :current-page="reqParams.page"
      :page-size="reqParams.pageSize"
      :total="total"
      @current-change="reqParams.page = $event"
    />
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import OrderItem from './components/order-item'
import { findOrderList } from '@/api/order'
export default {
  name: 'MemberOrder',
  components: { OrderItem },
  setup () {
    const activeName = ref('all')

    // 获取数据 | 筛选条件
    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    const orderList = ref([])
    const loading = ref(false)
    const total = ref(0)
    // 筛选条件变化重新加载
    watch(
      reqParams,
      () => {
        loading.value = true
        findOrderList(reqParams).then((data) => {
          orderList.value = data.result.items
          total.value = data.result.counts
          loading.value = false
        })
      },
      { immediate: true }
    )
    const tabClick = ({ index }) => {
      reqParams.page = 1
      reqParams.orderState = index
    }

    return {
      activeName,
      orderStatus,
      orderList,
      tabClick,
      loading,
      total,
      reqParams
    }
  }
}
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
}
.order-list {
  background: #fff;
  min-height: 400px;
  padding: 20px;
  position: relative;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
