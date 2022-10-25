import axios from 'axios'

const baseURL = 'http://localhost:3001/api'
let token = ''
export const setToken = (newToken) => {
  token = newToken
}
export const getBlogsByUser = (userId) => {
  return axios
    .get(`${baseURL}/blogs/${userId}`)
    .then(response => response.data)
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
export const newBlogRequest = (blog) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  return axios
    .post(`${baseURL}/blogs`, blog, config)
    .then(response => response.data)
    .catch(error => { return error })
}

export const updateBlogRequest = (blogForUpdate, id) => {
  return axios
    .put(`${baseURL}/blogs/${id}`, blogForUpdate)
    .then(response => response.data)
    .catch(error => { return error })
}
export const deleteBlogRequest = (idToDelete) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  return axios
    .delete(`${baseURL}/blogs/${idToDelete}`, config)
    .then(response => response.data)
    .catch(error => { return error })
}
