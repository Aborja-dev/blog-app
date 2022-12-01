
import React from 'react'
import { useSelector } from 'react-redux'
export const Alert = () => {
  const message = useSelector(state => state.notification)
  if (message) {
    return (
      <div className='alert'>{message}</div>
    )
  } else {
    return null
  }
}
