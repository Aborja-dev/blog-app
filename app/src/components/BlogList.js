import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import NewBlogForm from './NewBlog'
import { createNewBlog, deleteBlog, setBlogsService, updateBlog } from '../services/BlogService'
import { Blog } from './Blog'
import { Alert } from './Alert'
import { Toggable } from './Toggable'
import { getBlogsByUser } from '../services/Gateway'
import { getIDFromLocalstorage, sortByLikes } from '../utils/utils_functions'

const BlogList = (props) => {
  const [blogs, setBlogs] = useState([])
  const [alertMessage, setAlertMessage] = useState(null)
  useEffect(() => {
    setBlogsService(blogs)
  }, [blogs])
  useEffect(() => {
    const userID = getIDFromLocalstorage()
    if (userID) {
      getBlogsByUser(userID)
        .then(_blogs => {
          setBlogs(_blogs)
        })
    }
  }, [])

  const createBlog = async (blog) => {
    debugger
    try {
      const _newBlog = await createNewBlog(blog)
      showAlertMessage('la entrada se ha creado')
      renderNewBlogList(_newBlog)
    } catch (error) {
      showAlertMessage('ha habido un error')
    }
  }
  const renderNewBlogList = (newBlog) => {
    const blogList = [...blogs, newBlog]
    setBlogs(blogList)
  }
  const showAlertMessage = (message) => {
    setAlertMessage(message)
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
  }
  const sortClickHandler = () => {
    const sortedBlogs = [...blogs.sort(sortByLikes)]
    setBlogs(sortedBlogs)
  }
  const deleteHandler = async (id) => {
    const _deleteBlog = await deleteBlog(id)
    showAlertMessage('Laentrada se ha borrado')
    setBlogs(_deleteBlog)
  }
  const likeHandler = async (blogData) => {
    const updatedBlogList = await updateBlog({ blog: blogData }, (blog) => {
      const like = blog.likes + 1
      return {
        ...blog,
        likes: like
      }
    })
    setBlogs(updatedBlogList)
  }

  return (
    <div>
      <Alert message={alertMessage} />
      <h2>Lista de blogs</h2>
      <p>Bienvenido {props.name}</p>
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
BlogList.propTypes = {
  name: propTypes.string
}

export default BlogList
