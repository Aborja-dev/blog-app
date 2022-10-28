import React, { useState } from 'react'
import propTypes from 'prop-types'

const NewBlogForm = ({ onSubmitForm }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    onSubmitForm({ title, url })
  }
  return (

    <form onSubmit={submitHandler} aria-label='new-blog-form'>
      <div>
        <label>Titulo</label>
        <input
          type='text'
          name='title'
          aria-label='title'
          placeholder='Coloque el titulo del blog'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Url</label>
        <input
          type='text'
          name='url'
          aria-label='url'
          placeholder='http://miblog'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type='submit'>Crear Nuevo blog</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  onSubmitForm: propTypes.func.isRequired
}

export default NewBlogForm
