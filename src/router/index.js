// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Fillcam from '../components/fillcam_app.vue'
import MaxPunchForce from '../components/maxpunchforce_app.vue'
import About from '../views/About.vue'
import DwellTime from '../components/dwelltime_app.vue'
import Applications from '../views/Apps.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/applications/filldepth',
        name: 'Fillcam',
        component: Fillcam
      },
      {
        path: '/applications/maxpunchforce',
        name: 'MaxPunchForce',
        component: MaxPunchForce
      },
      {
        path: '/About',
        name: 'About',
        component: About
      },
      {
        path: '/applications/dwelltime',
        name: 'DwellTime',
        component: DwellTime
      },
      {
        path: '/applications',
        name: 'Applications',
        component: Applications
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
