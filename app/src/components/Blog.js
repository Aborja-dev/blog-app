import React from 'react'
import propTypes from 'prop-types'
import { BlogDetail } from './BlogDetail'
import { Toggable } from './Toggable'
export const Blog = ({ blog, clickDelete, clickLike }) => {
  const { title } = blog
  return (
    <li>{title}
      <button onClick={() => clickDelete(blog.id)}>Borrar</button>
      <Toggable buttonLabel='show more'>
        <BlogDetail data={blog} like={() => { clickLike(blog) }} />
      </Toggable>
    </li>
  )
}
Blog.propTypes = {
  blog: propTypes.object.isRequired,
  clickDelete: propTypes.func.isRequired,
  clickLike: propTypes.func.isRequired
}
