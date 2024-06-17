import { createRouter, createWebHistory } from 'vue-router'
import casesRoutes from "@/modules/cases/router"
import managementRoutes from "@/modules/users/router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "Vista principal donde se cargan las rutas"*/"@/views/LoginView.vue"),
    },
    {
      path: "/",
      name:"home",
      //beforeEnter: [ isAuthGuard ],
      component: () => import(/* webpackChunkName: "Vista principal donde se cargan las rutas"*/"@/views/HomeView.vue"),
      redirect: { name:"cases" },
      children:[
        { path: "casos", ...casesRoutes },
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
