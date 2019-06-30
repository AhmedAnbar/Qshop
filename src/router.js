import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import AdminLayout from './layouts/AdminLayout.vue'
import Main from './views/Main.vue'
import { fb } from './firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'main',
          component: Main
        }
      ]
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', component: require('./views/admin/Overview.vue').default },
        { path: 'products', component: require('./views/admin/Products.vue').default },
        { path: 'orders', component: require('./views/admin/Orders.vue').default }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = fb.auth().currentUser
  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router