
import React from 'react'
import propTypes from 'prop-types'
export const Alert = ({ message }) => {
  console.log(message)
  if (message) {
    return (
      <div>{message}</div>
    )
  } else {
    return null
  }
}

Alert.propTypes = {
  message: propTypes.string
}
