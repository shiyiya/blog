import axios from 'axios';

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 1000 * 3,
});

service.interceptors.request.use(
  config => {
    config.headers.common.Authorization = localStorage.getItem('token');
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// service.interceptors.response.use(res => {}, err => {})

export default service;
