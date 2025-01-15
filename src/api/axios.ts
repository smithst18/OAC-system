import axios from 'axios';
import { useCookies } from "vue3-cookies";
import { useMainStore } from '@/stores/mainStore';

const AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true, // Incluye cookies y encabezados de autorización
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

// request interceptor //
AxiosInstance.interceptors.request.use((config) => {
  const mainStore = useMainStore();
  mainStore.requestIsLoading = true;
  const { cookies } = useCookies();

  const token =  cookies.get('token');//get token from cookies using vue-cookies
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // set token at header request
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


// response interceptor //
AxiosInstance.interceptors.response.use((response) => {
   //set spinner in loggin vue  to false
  const mainStore = useMainStore();
  mainStore.requestIsLoading = false;

  return response;
}, (error) => {
  const mainStore = useMainStore();
  mainStore.requestIsLoading = false;
  return Promise.reject(error);
});

export default AxiosInstance;
