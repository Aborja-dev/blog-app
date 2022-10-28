import { setErrorMessage } from './errorHandlerService'
import { deleteBlogRequest, newBlogRequest, updateBlogRequest } from './Gateway'

let blogs = []
export const setBlogsService = (_blogs) => {
  blogs = _blogs
}

export const createNewBlog = ({ title, url }) => {
  const userData = window.localStorage.getItem('userSessionData') || null
  const { name: author } = JSON.parse(userData)
  const blog = { title, url, author }
  setErrorMessage('entrada de blog creada')
  return newBlogRequest(blog)
}
export const deleteBlog = async (id) => {
  await deleteBlogRequest(id)
  return blogs.filter(blog => blog.id !== id)
}

export const updateBlog = async ({ blog }, fnUpdate) => {
  const newBlog = fnUpdate(blog)
  const id = blog.id
  const updateBlogResponse = await updateBlogRequest(newBlog, id)
  const response = blogs.map(blog => blog.id !== id ? blog : updateBlogResponse)
  return response
}
