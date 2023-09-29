import Vue from 'vue'
import VueRouter from 'vue-router'
import Leads from '../views/Leads.vue'
import Logs from '../views/Logs.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Leads',
    component: Leads
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
