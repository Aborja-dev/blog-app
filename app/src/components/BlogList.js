/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import NewBlogForm from './NewBlog'
import { Blog } from './Blog'
import { Toggable } from './Toggable'
import { getIDFromLocalstorage } from '../utils/utils_functions'
import { useDispatch, useSelector } from 'react-redux'
import { blogsActions } from '../reducer/blogReducer'
import { showNotification } from '../reducer/notificationReducer'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const userID = getIDFromLocalstorage()
    if (userID) {
      dispatch(blogsActions.init())
    }
  }, [dispatch])

  const createBlog = async (blog) => {
    try {
      dispatch(blogsActions.create(blog))
      showAlertMessage('la entrada se ha creado')
    } catch (error) {
      showAlertMessage('ha habido un error')
    }
  }
  const showAlertMessage = (message) => {
    dispatch(showNotification(message, { time: 3000 }))
  }
  const sortClickHandler = () => dispatch(blogsActions.sort())

  const deleteHandler = async (id) => {
    dispatch(blogsActions.deleteBlogs(id))
    showAlertMessage('La entrada se ha borrado')
  }
  const likeHandler = async (blogData) => dispatch(blogsActions.updateLikes({ blog: blogData }))

  return (
    <div>
      <h2>Lista de blogs</h2>
      <p>Bienvenido {user.name}</p>
      <button onClick={sortClickHandler}>Ordenar por likes</button>
      <ul>
        {
                blogs.map((blog) =>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    clickDelete={deleteHandler}
                    clickLike={likeHandler}
                  />)
            }
      </ul>
      <div>
        <h2>Crear Nuevo Blog</h2>
        <Toggable buttonLabel='Nuevo blog' data-test-id='toggabel-new-blog'>
          <NewBlogForm onSubmitForm={createBlog} />
        </Toggable>
      </div>
    </div>
  )
}

export default BlogList
