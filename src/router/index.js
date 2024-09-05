import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/login',
    name: 'login',

    component: () => import('../views/login.vue')
  },
  {
    path:'/create',
    name: 'create',
    component:()=> import('../views/create.vue')
  },
  {
    path:'/edit',
    name: 'edit',
    component: ()=>import('../views/edit.vue')
  },
  {
    path: '/lists',
    name: 'lists',
    component:()=>import('../views/lists.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component:()=>import('../views/signup.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
