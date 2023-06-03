import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/register',
      component: () => import('../views/ninjas/NinjaRegistration.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

export default router
