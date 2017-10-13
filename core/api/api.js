import { create } from 'apisauce'

const api = (baseUrl) => create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
})

export default api
