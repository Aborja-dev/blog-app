import React, { useState } from 'react'
import propTypes from 'prop-types'
import { BlogDetail } from '../BlogDetail'
import { Toggable } from '../Toggable'
import { Alert } from '../Alert/Alert'
import { deleteBlogRequest } from '../../services/Gateway'
export const Blog = ({ blog }) => {
  const { title } = blog
  const [message, setMessage] = useState(null)
  const deleteHandler = async () => {
    const id = blog.id
    await deleteBlogRequest(id)
    setMessage('la entrada se ha borrado')
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }
  return (
    <li>{title}
      <Alert message={message} />
      <button onClick={deleteHandler}>Borrar</button>
      <Toggable buttonLabel='show more'>
        <BlogDetail data={blog} />
      </Toggable>
    </li>
  )
}
Blog.propTypes = {
  blog: propTypes.any.isRequired
}
