/* eslint-disable import/no-anonymous-default-export */
import { createNewBlog, updateBlog } from '../services/BlogService'
import { deleteBlogRequest, getBlogsByUser } from '../services/Gateway'
import { getIDFromLocalstorage, sortByLikes, updateByLikes } from '../utils/utils_functions'

const initState = (initialArray) => {
  return {
    type: '@blog/init',
    payload: initialArray
  }
}
const create = (newElement) => {
  return {
    type: '@blog/create',
    payload: newElement
  }
}
const fetchInitialState = () => {
  return async (dispatch) => {
    const userId = getIDFromLocalstorage()
    const blogs = await getBlogsByUser(userId)
    dispatch(initState(blogs))
  }
}
const createAsync = ({ title, url }) => {
  return async (dispatch) => {
    const newBlog = await createNewBlog({ title, url })
    dispatch(create(newBlog))
  }
}
const _delete = (id) => {
  return async (dispatch) => {
    await deleteBlogRequest(id)
    dispatch({
      type: '@blog/delete',
      payload: id
    })
  }
}
const updateLikes = ({ blog }) => {
  return async (dispatch) => {
    const updatedBlog = await updateBlog(blog, updateByLikes)
    dispatch({
      type: '@blog/like',
      payload: {
        blogToUpdate: updatedBlog,
        id: blog.id
      }
    })
  }
}

const sortList = () => {
  return {
    type: '@blog/sort',
    payload: null
  }
}
export const blogsActions = {
  init: fetchInitialState,
  create: createAsync,
  sort: sortList,
  deleteBlogs: _delete,
  updateLikes

}
export default (state = [], { type, payload }) => {
  switch (type) {
    case '@blog/init':
      return payload
    case '@blog/create':
      return [...state, payload]
    case '@blog/sort': {
      const sortedState = [...state.sort(sortByLikes)]
      return sortedState
    }
    case '@blog/delete':
      return state.filter(blog => blog.id !== payload)
    case '@blog/like': {
      const { blogToUpdate, id } = payload
      return state.map(blog => blog.id !== id ? blog : blogToUpdate)
    }
    default:
      return state
  }
}
