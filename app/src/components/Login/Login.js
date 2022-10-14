
import React, { useState } from 'react'
import propTypes from 'prop-types'
import { login } from '../../services/LoginService'

const Login = ({ onLoginSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const submitLoginHandle = async (event) => {
    event.preventDefault()
    const loginResult = await login({ username, password })
    onLoginSubmit(loginResult)
  }
  return (
    <>
      <h2>Login user</h2>
      <form onSubmit={submitLoginHandle}>
        <p>
          <label>Usuario: </label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' />
        </p>
        <p>
          <label>Contraseña: </label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type='text' />
        </p>
        <button type='submit'>Ingresar</button>
      </form>
    </>
  )
}
Login.propTypes = {
  onLoginSubmit: propTypes.func.isRequired
}
export default Login
