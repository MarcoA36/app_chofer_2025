import axios from 'axios'
import { API_URL } from './api_url';

axios.defaults.withCredentials = true;
const instance = axios.create({
    // baseURL:'http://localhost:3001',
    // baseURL:'https://app-chofer-back.onrender.com',
    baseURL:API_URL,
    withCredentials: true
})


instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token-chofer');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default instance
