<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange" />
      <!-- 商品面板(排序+列表) -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id" >
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    const route = useRoute()
    const loading = ref(false) // 加载中
    const finished = ref(false) // 加载完毕
    const goodsList = ref([]) // 商品列表数据
    // 请求参数
    let reqParams = {
      page: 1,
      pagesize: 20
    }
    const getData = () => {
      // console.log('加载数据去吧')
      loading.value = true
      // 设置二级分类的ID
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 获取数据成功
        if (result.items.length) {
          // 有数据 就追加数据
          goodsList.value.push(...result.items)
          // 把page改成下一页 页码
          reqParams.page++
        } else {
          // 没有数据，代表加载完成
          finished.value = true
        }
        loading.value = false
      })
    }

    // 在更改了二级分类时, 需要重新加载数据
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        finished.value = false
        goodsList.value = [] // 导致列表为空, 加载更多组件顶上来, 进入可视区即可加载数据
        reqParams = {
          page: 1,
          pagesize: 20
        }
      }
    })

    // 1. 更改排序组件的筛选数据, 重新请求
    const sortChange = (sortParams) => {
      // console.log(sortParams)
      finished.value = false
      // 合并请求参数, 保留之前参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }
    // 2. 更改筛选组件的筛选数据, 重新请求
    const filterChange = (filterParams) => {
      // console.log(filterParams)
      finished.value = false
      // 合并请求参数, 保留之前参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }

    return { getData, finished, loading, goodsList, sortChange, filterChange }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
