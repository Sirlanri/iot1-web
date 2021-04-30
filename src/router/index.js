import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: Home,
    children:[
      {
        path:'',
        name:'realtime',
        component:()=>import('@/views/realtime/index.vue')
      },
      
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
