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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
    path: '/view',
    name: 'view',
    component:()=>import('../views/view.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
