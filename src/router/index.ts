/**
 * Vue Router
 * 
 * Author: Tomas Fratrik
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/supported_portals',
      name: 'supported_portals',
      component: () => import('../views/SupportedPortals.vue')
    }
  ]
})

export default router
