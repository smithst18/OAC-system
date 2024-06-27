import axios from 'axios';


export const AxiosInstance = axios.create({
  baseURL:  `${import.meta.env.VITE_API_URL}/api`,
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});