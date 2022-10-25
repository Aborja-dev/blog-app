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
    <div>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label>Titulo</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' />
          </div>
          <div>
            <label>Url</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} type='text' />
          </div>
          <button type='submit'>Crear Nuevo blog</button>
        </form>
      </div>
    </div>
  )
}

NewBlogForm.propTypes = {
  onSubmitForm: propTypes.func.isRequired
}

export default NewBlogForm
