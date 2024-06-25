
export default {
    name:"gestion",
    path:'gestion',
    redirect: { name:"signin" },
    children:[
        {
            path:'registro',
            name:'signin',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            component: () =>  import(/* webpackChunkName: "tech principal view "*/"@/modules/users/views/SignIn.vue"),
        },
        {
            path:'administracion',
            name:'management',
            //meta:{ rolsAllow: ['admin', 'tech'] },
            //beforeEnter: [ rolGuard ],
            component: () =>  import (/* webpackChunkName: "tech principal view "*/"@/modules/users/views/ManagementView.vue"),
        },
        { 
            path: '/:pathMatch(.*)*', 
            redirect:{ name:"management" }
        },
    ]
}

