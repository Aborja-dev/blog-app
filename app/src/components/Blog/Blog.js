import React from 'react'
import propTypes from 'prop-types'
import { BlogDetail } from '../BlogDetail'
import { Toggable } from '../Toggable'
export const Blog = ({ blog, clickDelete }) => {
  const { title } = blog
  const clickHandler = () => clickDelete(blog.id)
  return (
    <li>{title}
      <button onClick={clickHandler}>Borrar</button>
      <Toggable buttonLabel='show more'>
        <BlogDetail data={blog} />
      </Toggable>
    </li>
  )
}
Blog.propTypes = {
  blog: propTypes.object.isRequired,
  clickDelete: propTypes.func.isRequired
}
