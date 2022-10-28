
import React from 'react'
import propTypes from 'prop-types'
export const Alert = ({ message }) => {
  if (message) {
    return (
      <div className='alert'>{message}</div>
    )
  } else {
    return null
  }
}

Alert.propTypes = {
  message: propTypes.string
}
