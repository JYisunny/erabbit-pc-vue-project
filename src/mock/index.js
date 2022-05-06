import Mock from 'mockjs'
import qs from 'qs'

// 基本配置
Mock.setup({
  // 随机延迟 500-1000毫秒，    模拟网络延迟
  timeout: '500-1000'
})

// 拦截接口     /my/test
// 1. 接口地址路径规则，需要匹配到它
// 2. 请求方式
// 3. 返回数据（函数返回数据）
Mock.mock(/\/my\/test/, 'get', () => {
  // 随机数据逻辑   目标： 5条数据  [{id:'',name:''},{id:'',name:''},...]
  const arr = []
  for (let i = 0; i < 5; i++) {
    // arr.push(Mock.mock('@id'))
    arr.push(Mock.mock({
      id: '@id',
      name: '@cname',
      image: '@image(200x100)'
    }))
  }
  return { msg: '获取数据成功', result: arr }
})

// 模拟  我的收藏接口
Mock.mock(/\/member\/collect/, 'get', config => {
  console.log(config) // console.log(config.url)
  // http: //pcapi-xiaotuxian-front-devtest.itheima.net/member/collect?page=1&pageSize=4&collectType=1
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString) // {page: "1", pageSize: "4", collectType: "1"}
  const items = []
  for (let i = 0; i < +queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      desc: '@ctitle(4,10)',
      price: '@float(100,200,2,2)',
      // http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_7.jpg
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
    }))
  }
  return {
    msg: '获取收藏商品成功',
    result: {
      counts: 35,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items
    }

  }
})

// 模拟   我的足迹接口
Mock.mock(/\/member\/browseHistory/, 'get', config => {
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString)
  const items = []
  for (let i = 0; i < +queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@natural',
      name: '@ctitle',
      desc: '@ctitle',
      price: '@float(100,200,2,2)',
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
    }))
  }

  return {
    msg: '获取我的足迹商品成功',
    result: {
      counts: 53,
      pageSize: +queryObject.pageSize,
      pages: {
        page: +queryObject.page,
        items
      }
    }
  }
})
