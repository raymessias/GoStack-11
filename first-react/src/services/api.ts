import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com',
})
// Axios middleware to convert all api responses to camelCase

export default api
