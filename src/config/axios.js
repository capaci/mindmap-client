import axios from 'axios'

const setTokenInterceptor = (config) => {
    const token = localStorage.getItem('auth-token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

axios.interceptors.request.use(setTokenInterceptor);


export default axios
