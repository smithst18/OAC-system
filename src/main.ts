import './assets/css/main.css'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
//global config for vue3 toastify
app.use(
  Vue3Toastify,
  {
    pauseOnHover: false,
    autoClose: 3000,
    style: {
      opacity: '1',
      userSelect: 'initial',
    },
  } as ToastContainerOptions,
);

app.mount('#app')
