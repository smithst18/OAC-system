
export default {
    name:"tickets",
    redirect: { name:"dashboard" },
    children:[
        {
            path:'inicio',
            name:'dashboard',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/ticket/views/DashboardView.vue"),
        },
        {
            path:'pendientes',
            name:'pending',
            // meta:{ rolsAllow: ['admin', 'tech'] },
            // beforeEnter: [ rolGuard ],
            redirect: { name:"unAssigned" },
            /* aca esta la funcionalidad de tickets pendientes  en la ventana de asignados y no asignados */
            children:[
                { 
                    path: "asignados/:type?", 
                    name:"assigned",
                    component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/ticket/pages/AssignmentView.vue"),
                    props:true,
                },
                { 
                    path: "no-asignados/:type?", 
                    name:"unAssigned",
                    component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/ticket/pages/AssignmentView.vue"),
                    props:true,
                },
            ],
            component:() => import(/* webpackChunkName: "tech pending tickets view "*/"@/modules/ticket/views/PendingView.vue"),
        },
        // colocar ruta para el cliente y el admin compartidas
        { 
            path: '/:pathMatch(.*)*', 
            redirect:{ name:"dashboard" }
        },
    ]
}

