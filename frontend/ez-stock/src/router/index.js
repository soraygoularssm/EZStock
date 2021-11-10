import { createRouter, createWebHistory } from 'vue-router'
import Charts from '../views/Charts.vue'
import Filters from '../views/Filters.vue'

const routes = [
  {
    path: '/',
    name: 'Charts',
    component: Charts
  },
  {
    path: '/filters',
    name: 'Filters',
    component: Filters
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
