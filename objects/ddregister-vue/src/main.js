import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 样式引入
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

// stylus样式重置引入
import 'common/stylus/index.styl'


// console.log=function(){}


/**`
 * 设置网络请求axios
 */
import axios from 'axios'
axios.proxyt
// 设置axios 的默认属性
axios.defaults.withCredentials = true //(跨域时是否使用证书)//跨域是因为热重载vue项目是vue的服务器，请求数据是自己的服务器
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' //(请求头)
// axios.defaults.baseURL = (process.env.NODE_ENV == 'development' ? 'http://localhost:8888/didi' : 'http://47.98.182.61:8888/didi') //(根据开发环境和生产环境使用不同的请求地址)
axios.defaults.baseURL = 'http://47.98.182.61:8888'
//将axios添加到vue的原型中
Vue.prototype.$http = axios

/**
 * 复制到剪切板组件
 */
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


Vue.mixin({
  beforeRouteLeave:function(to, from, next){
    if (from && from.meta.rank && to.meta.rank && from.meta.rank>to.meta.rank)
    {//如果返回上一层，则摧毁本层缓存。
      if (this.$vnode && this.$vnode.data.keepAlive)
      {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
        {
          if (this.$vnode.componentOptions)
          {
            var key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys  = this.$vnode.parent.componentInstance.keys;
            if (cache[key])
            {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  },
});

/**
 *Mint-UI按需加入组件
 */
import { Cell } from 'mint-ui';
Vue.component(Cell.name, Cell);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
