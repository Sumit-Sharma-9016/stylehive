import axios from 'axios'

const api = axios.create({
    baseURL: "https://stylehive-backend-8xl7.onrender.com/api"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.token = token;
    }
    return config;
}, (err) => {
    return Promise.reject(err)
});

export default api;
