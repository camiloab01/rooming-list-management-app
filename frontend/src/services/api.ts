import axios from 'axios'
import qs from 'qs'

const api = axios.create({
  baseURL: 'http://localhost:8181/api',

  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      localStorage.removeItem('jwt')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
