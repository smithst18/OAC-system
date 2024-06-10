import { createRouter, createWebHistory } from 'vue-router'
import casesRoutes from "@/modules/cases/router"
import mailRoutes from "@/modules/mail/router"
import managementRoutes from "@/modules/users/router"
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: "/",
      name:"home",
      //beforeEnter: [ isAuthGuard ],
      component: () => import(/* webpackChunkName: "Vista principal donde se cargan las rutas"*/"@/views/HomeView.vue"),
      redirect: { name:"Cases" },
      children:[
        { path: "casos", ...casesRoutes },
        { path: "mail", ...mailRoutes },
        { path: "configuracion", ...managementRoutes },
        //{ path: "mail", ...chatRoutes },
      ]
    },
    { 
      path: '/:pathMatch(.*)*', 
      redirect:{ name:"login" }
    },
  ]
})

export default router
