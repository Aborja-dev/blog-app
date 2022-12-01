
import React, { useState } from 'react'
import propTypes from 'prop-types'
import { login } from '../services/LoginService'
import { useDispatch } from 'react-redux'
import { userActions } from '../reducer/userReducer'

const Login = ({ onLoginSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const submitLoginHandle = async (event) => {
    event.preventDefault()
    dispatch(userActions.login({ username, password }))
    const loginResult = await login({ username, password })
    setUsername('')
    setPassword('')
    const status = loginResult.status
    switch (status) {
      case 200:
        onLoginSubmit(loginResult.body)
        break
      case 401:
        onLoginSubmit(new Error('acceso incorrecto'))
        break
      default:
        onLoginSubmit(new Error('ocurrio un error'))
    }
  }

  return (
    <>
      <h2>Login user</h2>
      <form onSubmit={submitLoginHandle}>
        <p>
          <label>Usuario: </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            name='username'
          />
        </p>
        <p>
          <label>Contraseña: </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='text'
            name='password'
          />
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
