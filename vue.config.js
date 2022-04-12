const path = require('path')

module.exports = {
  lintOnSave: false,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 哪些文件自动引入, 使用绝对路径
      // 需要使用 path.join来拼接完整路径
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  }
}
