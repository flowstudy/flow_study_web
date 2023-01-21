import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/404',
  //   component: () => import('@/views/error-page/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/error-page/401'),
  //   hidden: true
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/codeList',
    name: 'codeList',
    component: () => import('../views/codeList.vue')
  },
  {
    path: '/codeDetail/:id',
    name: 'codeDetail',
    component: () => import('../views/codeDetail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
