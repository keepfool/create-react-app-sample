const { injectBabelPlugin } = require('react-app-rewired')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = function override (config, env) {
  //do stuff with the webpack config...
  // 生产环境不需要hot-reloader
  if (env === 'production') {
    return config
  }

  // 向babel-loader添加react-hot-loader插件
  config = injectBabelPlugin('react-hot-loader/babel', config)

  // 路径别名映射，用'@'来表示'src'绝对路径
  config.resolve.alias = {
    '@': resolve('src')
  }

  return config
}