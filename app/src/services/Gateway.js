import axios from 'axios'

const baseURL = 'http://localhost:3001/api'
let token = ''
export const setToken = (newToken) => {
  token = newToken
}

export const apiLogin = (user) => {
  return axios
    .post(`${baseURL}/login`, user)
    .then(response => response.data)
    .catch(error => {
      if (error.response.status === 401) { return 'Usuario invalido o no existe' }
      return error
    })
}
export const createBlog = (blog) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  return axios
    .post(`${baseURL}/blogs`, blog, config)
    .then(response => response.data)
}
