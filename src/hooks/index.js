// 提供复用逻辑函数(钩子)
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 * 数据懒加载函数
 * @param {Element} target - DOM对象
 * @param {Function} apiFn - API接口函数后台数据
 */
export const useLazyData = (apiFn) => {
  const result = ref([])
  const target = ref(null)
  // stop 停止观察
  const { stop } = useIntersectionObserver(
    // 监听的目标元素
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否进入可视区
      if (isIntersecting) {
        stop()
        // 调用 API接口函数获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 配置选项, 相交的比例大于 0就触发
    {
      threshold: 0
    }
  )
  return { result, target }
}
