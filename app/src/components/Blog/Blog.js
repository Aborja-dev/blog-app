import React from 'react'
import propTypes from 'prop-types'
const Blog = (props) => {
  return (
    <div>
      <h2>Lista de blogs</h2>
      <p>Bienvenido {props.name}</p>
      <ul>
        {
                props.blogs.map((blog, index) => <li key={index}>{blog}</li>)
            }
      </ul>
    </div>
  )
}
Blog.propTypes = {
  name: propTypes.string,
  blogs: propTypes.array
}

export default Blog
