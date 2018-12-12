const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  baseUrl: './',
  lintOnSave: true
  // configureWebpack: config => {
  //   require('vux-loader').merge(config, {
  //     options: {},
  //     plugins: ['vux-ui']
  //   })
  // }
}