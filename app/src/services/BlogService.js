import { setErrorMessage } from './errorHandlerService'
import { deleteBlogRequest, newBlogRequest, updateBlogRequest } from './Gateway'

export const createNewBlog = ({ title, url }) => {
  const userData = window.localStorage.getItem('userSession') || null
  const { name: author } = JSON.parse(userData)
  const blog = { title, url, author }
  setErrorMessage('entrada de blog creada')
  return newBlogRequest(blog)
}
export const deleteBlog = async (id) => {
  await deleteBlogRequest(id)
}

export const updateBlog = async (blog, fnUpdate) => {
  const newBlog = fnUpdate(blog)
  const id = blog.id
  const updateBlogResponse = await updateBlogRequest(newBlog, id)
  return updateBlogResponse
}
