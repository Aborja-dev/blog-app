/* eslint-disable */

import React, { useState } from 'react'
import propTypes from 'prop-types'
import NewBlogForm from '../NewBlog/NewBlog'
import { createNewBlog } from '../../services/BlogService'
import { Blog } from '../Blog/Blog'
import { Alert } from '../Alert/Alert'
import { Toggable } from '../Toggable'
const BlogList = (props) => {
  const [blogs, setBlogs] = useState(props.blogs)
  const [alertMessage, setAlertMessage] = useState(null)
  const createBlog = async (blog) => {
    try {
      const _newBlog = await createNewBlog(blog)
      const blogList = [...blogs, _newBlog]
      setAlertMessage('la entrada se ha creado')
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
      setBlogs(blogList)
    } catch (error) {
      setAlertMessage('ha habido un error')
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    }
  }
  const sortClickHandler = () => {
    const sortedBlogs = blogs.sort(sortByLikes)
    setBlogs(sortedBlogs) 
  }
  const sortByLikes = (a, b) => {
    const likesA = a.likes
    const likesB = b.likes
    return likesA < likesB
      ? 1
      : -1
  }
  return (
    <div>
      <Alert message={alertMessage} />
      <h2>Lista de blogs</h2>
      <p>Bienvenido {props.name}</p>
      <button onClick={sortClickHandler}>Ordenar por likes</button>
      <ul>
        {
                blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
            }
      </ul>
      <div>
        <h2>Crear Nuevo Blog</h2>
        <Toggable buttonLabel='Nuevo blog'>
          <NewBlogForm onSubmitForm={createBlog} />
        </Toggable>
      </div>
    </div>
  )
}
BlogList.propTypes = {
  name: propTypes.string,
  blogs: propTypes.array
}

export default BlogList
