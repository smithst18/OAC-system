
export default {
    name:"gestion",
    redirect: { name:"signin" },
    children:[
        {
            path:'registro',
            name:'signin',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/users/views/SignIn.vue"),
        },
        {
            path:'gestion',
            name:'management',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            children:[
                { 
                    path: "clientes/:type?", 
                    name:"clients",
                    component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/users/pages/ManagementPage.vue"),
                    props:true,
                },
                // { 
                //     path: "tecnicos/:type?", 
                //     name:"tecs",
                //     component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/ticket/pages/AssignmentView.vue"),
                //     props:true,
                // },
            ],
            component:() => import(/* webpackChunkName: "tech principal view "*/"@/modules/users/views/Management.vue"),
        },
        { 
            path: '/:pathMatch(.*)*', 
            redirect:{ name:"management" }
        },
    ]
}

