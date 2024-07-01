import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import  { useMainStore } from "../stores/mainStore";


export const isAuth = (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
  const { isLoged } = useMainStore();

  if(!isLoged) next({ name:'login'});
  else next()
  
}

export const isNotAuth = (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
  const { isLoged } = useMainStore();

  if(isLoged) next({ name:'home'});
  else next()
  
}