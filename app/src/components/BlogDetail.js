/* eslint-disable*/
import React from 'react'
import propTypes from 'prop-types'

export const BlogDetail = ({ data, like }) => {
  const { likes, author, url } = data


  return (
    <>
    <article data-testid="blog-detail">
      <p><a href='#'>{url}</a></p>
      <p>
        likes: {likes}
      </p>
      <button onClick={like}>Like</button>
      <p>{author}</p>
    </article>
    </>

  )
}

BlogDetail.propTypes = {
  data: propTypes.any,
  like: propTypes.func
}
