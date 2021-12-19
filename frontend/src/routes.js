import Files from './views/Files.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import NavigationBar from './components/NavigationBar.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import { useStore } from 'vuex'


/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [

  {path: '/', redirect: '/login'},
  { path: '/dashboard',
    component: NavigationBar,
    redirect: '/dashboard/files',
    meta : {
      requiresAuth : true
    },
    children: [
      {
        path: 'files',
        component: Files
      },
      {
        path: 'about',
        component: About
      }
    ]



  },
  {
    path: '/login',
    name: 'Login',
    component: Login,

  },
  {
    path: '/register',
    name: 'Register',
    component: Register,

  },
  { path: '/:path(.*)', component: NotFound },
]

