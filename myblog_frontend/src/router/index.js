import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Release from '../../components/Release.vue'
import passageList from '../../components/passageList.vue'
import edit from '../../components/edit.vue'
import singlePassage from '../../components/singlePassage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect: '/passageList',
    children: [
      {
        path: '/release',
        name: 'Release',
        component: Release
      },
      {
        path: '/passageList',
        name: 'passageList',
        component: passageList
      },
      {
        path: '/edit',
        name: 'edit',
        component: edit
      },
      {
        path: '/singlePassage/:id',
        name: 'singlePassage',
        component: singlePassage
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
