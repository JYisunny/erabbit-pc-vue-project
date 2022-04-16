
<script>
import { h } from 'vue'

export default {
  name: 'XtxBread',
  render () {
    // 用法:
    // 1. template 标签去除, 单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2.0 的 h函数传参进来的, vue3.0的 h函数导入进来
    // 4. h 第一个参数：标签名字 第二个参数：标签属性对象 第三个参数：子节点
    // 目标:
    // ①. 创建 xtx-bread父容器
    // ②. 获取默认插槽内容
    // ③. 去除 xtx-bread-item组件的 i标签，应该由 render函数来创建
    // ④. 遍历插槽中的 item，得到一个动态创建的节点，最后一个item不加 i标签
    // ⑤. 把动态创建的节点渲染在 xtx-bread标签中
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style lang='less'>
// 去除 scoped 属性, 目的: 让样式作用到 xtx-bread-item组件
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式, 不合理
    // &:last-child{
    //   display: none;
    // }
  }
}
</style>
