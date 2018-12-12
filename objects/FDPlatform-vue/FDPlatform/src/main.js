import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
// import { sync } from 'vuex-router-sync'

//main.js定义的变量并不是全局变量，在其他类无法使用
// var testttt = 'hhahahahaha'

/**
 * ------------------------router前进或返回记录----------------------
 */
Vue.use(Vuex)

const state = {
  direction: 'forward',
  pageTitle: ''
}
let store = new Vuex.Store({
  state,
  mutations: {
    updateDirection (state, payload) {
      console.log('store mutations updateDirection direction is =>', payload.direction)
      state.direction = payload.direction
    },
    updatePageTitle (state, payload) {
      console.log('store mutations updatePageTitle name is =>', payload.name)
      state.pageTitle = payload.name
    }
  }
});


// sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
console.log('first historyCount is =>', historyCount)
//设置到history的值都不会存储数据类型，一切变为字符串类型
history.setItem('/', 0)

// 监听一个滑动结束用时间节点来做为标志判断是否是ios右滑返回
let endTime = Date.now()
document.addEventListener('touchend', () => {
  endTime = Date.now()
})

let isPush = false
let methods = ['push', 'go', 'replace', 'forward', 'back']
methods.forEach(key => {
  // js bind的妙用，获取router的一个方法，绑定全局router对象
  let method = router[key].bind(router)

  // 替换router的方法，使得每次调用router的跳转方法时，先来到这里，再调用router原始的方法
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {

  store.commit('updatePageTitle', {name: to.name?to.name:''})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  console.log('to.path and from.path is =>', to.path, from.path)
  console.log('toIndex and fromIndex is =>', toIndex, fromIndex)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        // ios 左滑返回 不需要动画
        store.commit('updateDirection', {direction: ''})
      } else {
        store.commit('updateDirection', { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
})



/**
 * ------------------------bmob数据操作----------------------
 */
import Bmob from "hydrogen-js-sdk"
Bmob.initialize("cf0a2529ddfc481ff6009427bfb79f4c", "c841d5d3f7516e4f7ea4f2c9012293ed");
// 挂载到全局使用
Vue.prototype.Bmob = Bmob



// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// // use
// Vue.use(mavonEditor)


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
