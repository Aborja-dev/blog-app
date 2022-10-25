import React, { useState } from 'react'
import propTypes from 'prop-types'
export const Toggable = ({ buttonLabel = 'show', children }) => {
  const [visible, setVisible] = useState(false)
  const displayType = visible ? 'block' : 'none'
  const clickHandler = () => {
    toggleVisibility()
  }
  const toggleVisibility = () => {
    const newState = !visible
    setVisible(newState)
  }
  return (
    <div>
      <div style={{ display: displayType }}>
        {children}
        <button
          onClick={clickHandler}
        >Ocultar
        </button>
      </div>
      <button
        style={{ display: visible ? 'none' : 'block' }}
        onClick={clickHandler}
      >{buttonLabel}
      </button>
    </div>
  )
}

Toggable.propTypes = {
  buttonLabel: propTypes.string,
  children: propTypes.any
}
