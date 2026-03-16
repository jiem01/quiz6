import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
})

instance.interceptors.request.use(config => {
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null
  if (userInfo && userInfo.access) {
    config.headers.Authorization = `Bearer ${userInfo.access}`
  }
  return config
})

export default instance