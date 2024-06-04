
export default {
    name:"mails",
    redirect: { name:"imbox" },
    children:[
        {
            path:'inicio',
            name:'imbox',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/ticket/views/DashboardView.vue"),
        },
        {
            path:'favoritos',
            name:'favorite',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/ticket/views/DashboardView.vue"),
        },
        {
            path:'enviados',
            name:'sended',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/ticket/views/DashboardView.vue"),
        },
        {
            path:'borradores',
            name:'clip',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/ticket/views/DashboardView.vue"),
        },
        {
            path:'spam',
            name:'spam',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/ticket/views/DashboardView.vue"),
        },
        {
            path:'papelera',
            name:'deleted',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/ticket/views/DashboardView.vue"),
        },
        { 
            path: '/:pathMatch(.*)*', 
            redirect:{ name:"dashboard" }
        },
    ]
}

