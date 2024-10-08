import { rolGuard } from "@/router/routerGuards";

export default {
    name:"cases",
    redirect: { name:"dashboard" },
    children:[
        {
            path: 'inicio',
            name: 'dashboard',
            meta: { rolsAllow: ['admin', 'auditor', 'normal'] },
            beforeEnter: [rolGuard],
            component: () => import(/* webpackChunkName: "cases principal view" */ "@/modules/cases/views/DashboardView.vue"),
        },
        {
            path:'lista',
            name:'list',
            meta:{ rolsAllow: ['admin', 'auditor', 'normal'] },
            beforeEnter: [ rolGuard ],
            component: () =>  import(/* webpackChunkName: "cases list view "*/"@/modules/cases/views/ListCases.vue"),
        },
        {
          path:'editar/:id',
          name:'update-case',
          meta:{ rolsAllow: ['admin', 'auditor', 'normal'] },
          beforeEnter: [ rolGuard ],
          component: () =>  import(/* webpackChunkName: "cases list view "*/"@/modules/cases/views/UpdateCase.vue"),
        },
        { 
          path:'agregar',
          name:'add-case',
          meta:{ rolsAllow: ['admin', 'auditor', 'normal'] },
          beforeEnter: [ rolGuard ],
          component: () =>  import(/* webpackChunkName: "cases list view "*/"@/modules/cases/views/AddCases.vue"),
        },
        { 
          path:'reportes',
          name:'report-maker',
          meta:{ rolsAllow: ['admin', 'auditor'] },
          beforeEnter: [ rolGuard ],
          component: () =>  import(/* webpackChunkName: "cases list view "*/"@/modules/cases/views/ReportMakerView.vue"),
        },
        { 
            path: '/:pathMatch(.*)*', 
            redirect:{ name:"dashboard" }
        },
    ]
}

