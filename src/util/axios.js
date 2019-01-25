import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 1000 * 3
})

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    config.headers.common['Authorization'] = 'Bearer ' + token
    if (!!config.data) {
      const data = config.data
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key]
          data[key] = value + ''
        }
      }
      config.data = data
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

//service.interceptors.response.use(res => {}, err => {})

export default service
