import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: () => import('@/pages/LandingPage')
    },
    {
      path: '/db-demo',
      icon: 'none',
      name: 'db-demo',
      component: () => import('@/pages/DbDemo')
    },
    {
      path: '/file-diff',
      icon: 'none',
      name: 'file-diff',
      component: () => import('@/pages/FileDiff')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
