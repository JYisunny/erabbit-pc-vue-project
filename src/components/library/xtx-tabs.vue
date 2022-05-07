<script>
export default {
  name: 'XtxTabs',
  render () {
    // 返回的内容会进行渲染
    // 1. 在babel 的帮助下，可以再vue 中写jsx语法
    // 2. 数据的使用
    const name = 'tom'
    const title = 'tom 12'
    // 3. 时间如何绑定
    const say = () => {
      console.log('Hi jsx')
    }
    // 4. 定义一个jsx对象
    const sub = <sub>&nbsp; TomCat</sub>
    const sup = [<sup>Jerry&nbsp;</sup>, <sup> &nbsp;JerryMouse</sup>]
    return <h1 title={title} onClick={say} >{name}{sub}{sup}</h1>
  }
}
</script>

<style lang="less" scoped>

</style>
