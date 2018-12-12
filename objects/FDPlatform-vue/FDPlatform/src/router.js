import Vue from 'vue'
import Router from 'vue-router'
import OutlineList from './views/OutlineList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: OutlineList,
      meta:{rank:1.5}
    },
    {
      path: '/HouseDetail',
      name: '详情',
      component: () => import('./views/HouseDetail'),
      meta:{rank:2.5}
    }
  ]
})
