import axios from 'axios'

const setTokenInterceptor = (config) => {
    const token = localStorage.getItem('auth-token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}

axios.defaults.baseURL = 'http://localhost:3333';

axios.interceptors.request.use(setTokenInterceptor);


export default axios
