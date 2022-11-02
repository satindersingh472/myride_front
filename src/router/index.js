import Vue from 'vue'
import VueRouter from 'vue-router'
import PostPicture from '@/components/postPicture.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: PostPicture

  }
  
]

const router = new VueRouter({
  routes
})



export default router
