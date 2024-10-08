import { createRouter, createWebHistory } from '@ionic/vue-router';
import page from '../views/layout/page.vue'
// import print from '../views/layout/auxiliare/printer.vue'
import disponible from '../views/operations/output/disponible.vue'
import Logi from '../views/auth/login.vue'
import Invita from '../views/layout/auxiliare/invita.vue'
// import { components } from 'vuetify/dist/vuetify-labs.js';
import mainpage from '../views/mainPage.vue'
import page1 from '../views/pages/page1.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path : '/home',
    component: page
  },
  {
    path : '/print',
    component: disponible
  },
  {
    path : '/login',
    component: Logi,
  },
  {
    path : '/invite',
    component: Invita
  },
  {
    path: '/main/',
    component: mainpage,
    children: [
      {
        path: '',
        redirect: '/main/dispo'
      },
      {
        path: 'dispo',
        component: page1
      },
      {
        path: 'vendu',
        component: () => import('../views/pages/page2.vue')
      },
      {
        path: 'achats',
        component: () => import('../views/pages/page3.vue')
      },
      {
        path: 'rotation',
        component: () => import('../views/pages/page4.vue')
      },{
        path: 'plus',
        component: () => import('../views/pages/page5.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
