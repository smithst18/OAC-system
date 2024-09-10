import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import  { useMainStore } from "../stores/mainStore";


export const isAuth = (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
  const { isLoged } = useMainStore();

  if(!isLoged) next({ name:'login'});
  else next()
  
}

export const isNotAuth = (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
  const { isLoged, logedUser } = useMainStore();

  if(isLoged) {
    if(logedUser.rol == "admin") next({ name:'management'});
    else next({ name:'home'});
  }
  else next()
  
}

export const rolGuard = (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
  const store = useMainStore();

  if(to.meta.rolsAllow && Array.isArray(to.meta.rolsAllow) && to.meta.rolsAllow.includes(store.logedUser.rol)){
    next();
  } 
  else {
    if(store.logedUser.rol == 'normal') next({ name:'dashboard'});
  }
}