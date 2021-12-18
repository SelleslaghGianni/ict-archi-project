import Files from './views/Files.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import NavigationBar from './components/NavigationBar.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [

  { path: '/dashboard',
    component: NavigationBar,
    redirect: '/dashboard/files',
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
