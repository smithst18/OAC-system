import { rolGuard } from "@/router/routerGuards";

export default {
    name:"managment",
    redirect: { name:"signin" },
    children:[
        {
            path:'registro',
            name:'signin',
            meta:{ rolsAllow: ['admin'] },
            beforeEnter: [ rolGuard ],
            component: () =>  import(/* webpackChunkName: "tech principal view "*/"@/modules/users/views/SignIn.vue"),
        },
        {
            path:'administracion',
            name:'management',
            meta:{ rolsAllow: ['admin'] },
            beforeEnter: [ rolGuard ],
            component: () =>  import (/* webpackChunkName: "tech principal view "*/"@/modules/users/views/ManagementView.vue"),
        },
        { 
            path: '/:pathMatch(.*)*', 
            redirect:{ name:"management" }
        },
    ]
}

