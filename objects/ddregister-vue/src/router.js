import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{rank:1.5,isShowFooter:true},
    },
    {
      path: '/mine',
      name: 'mine',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/mine/Mine'),
      meta:{rank:1.5,isShowFooter:true},
    },
    {
      path: '/login01',
      name: 'login01',
      component: () => import(/* webpackChunkName: "about" */ './views/login/Login01'),
      meta:{rank:2.5},
    },
    {
      path: '/login02',
      name: 'login02',
      component: () => import(/* webpackChunkName: "about" */ './views/login/Login02'),
      meta:{rank:2.5},
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: () => import(/* webpackChunkName: "about" */ './views/coupon/Coupon01'),
      meta:{rank:2.5},
    },
    {
      path: '/applyCash',
      name: 'applyCash',
      component: () => import(/* webpackChunkName: "about" */ './views/coupon/ApplyCash'),
      meta:{rank:3.5},
    }
  ]
})
