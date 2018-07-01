const { injectBabelPlugin } = require('react-app-rewired')

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  // 生产环境不需要hot-reloader
  if (env === 'production') {
    return config
  }

  // 向babel-loader添加react-hot-loader插件
  config = injectBabelPlugin('react-hot-loader/babel', config)

  return config
}