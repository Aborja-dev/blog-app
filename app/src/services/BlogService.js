import { setErrorMessage } from './errorHandlerService'
import { newBlogRequest } from './Gateway'

export const createNewBlog = ({ title, url }) => {
  const userData = window.localStorage.getItem('userSessionData') || null
  const { name: author } = JSON.parse(userData)
  const blog = { title, url, author }
  setErrorMessage('entrada de blog creada')
  return newBlogRequest(blog)
}
