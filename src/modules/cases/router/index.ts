
export default {
    name:"cases",
    redirect: { name:"dashboard" },
    children:[
        {
            path:'inicio',
            name:'dashboard',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            component: () =>  import(/* webpackChunkName: "cases principal view "*/"@/modules/cases/views/DashboardView.vue"),
        },
        {
            path:'lista',
            name:'list',
            // meta:{ rolsAllow: ['admin', 'tech'] },
            // beforeEnter: [ rolGuard ],
            component: () =>  import(/* webpackChunkName: "cases list view "*/"@/modules/cases/views/ListCases.vue"),
        },
        { 
            path: '/:pathMatch(.*)*', 
            redirect:{ name:"dashboard" }
        },
    ]
}

