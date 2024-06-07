import Vue from '@vitejs/plugin-vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TaskManager from '../views/TaskManager.vue'
import UserProfile from '../components/UserProfile.vue'
import UserLogin from '../components/UserLogin.vue'
import UserSignup from '../components/UserSignup.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/tasks', component: TaskManager },
  { path: '/profile', component: UserProfile },
  { path: '/login', component: UserLogin },
  { path: '/signup', component: UserSignup }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
