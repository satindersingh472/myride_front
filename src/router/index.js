import Vue from 'vue'
import VueRouter from 'vue-router'
import EditPicture from '@/components/editPicture.vue'
import DataShow from "@/components/dataShow.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/edit_picture',
    component: EditPicture

  },
  {
    path: '/',
    component: DataShow
  }
  
]

const router = new VueRouter({
  routes
})



export default router
