import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/questionnaire/:user_doc_id',
    name: 'questionnaire',
    component: () => import('@/views/Questionnaire.vue')
  },
  {
    path: '/plus_questionnaire',
    name: 'plus_questionnaire',
    component: () => import('@/views/Plus_questionnaire.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
