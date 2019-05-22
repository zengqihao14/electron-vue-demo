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
      path: '/subpage',
      icon: 'none',
      name: 'subpage',
      component: () => import('@/pages/Subpage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
