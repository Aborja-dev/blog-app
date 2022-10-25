/* eslint-disable*/
import React, { useState } from 'react'
import propTypes from 'prop-types'
import { updateBlogRequest } from '../services/Gateway'

export const BlogDetail = ({ data }) => {
  const { likes, author, url } = data
  const [like, setLike] = useState(likes)
  const likeHandler = async () => {
    const updatedBlog = updateBlog()
    const id = data.id
    const updateBlogResponse = await updateBlogRequest(updatedBlog, id)
    setLike(updateBlogResponse.likes)
  }
  const updateBlog = () => {
    const newLikes = like + 1
    return {
      ...data,
      likes: newLikes
    }
  }
  return (
    <div>
      <p><a href='#'>{url}</a></p>
      <p>
        likes: {like}
      </p>
      <button onClick={likeHandler}>Like</button>
      <p>{author}</p>
    </div>

  )
}

BlogDetail.propTypes = {
  data: propTypes.any
}
