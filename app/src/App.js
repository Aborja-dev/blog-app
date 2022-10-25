/* eslint-disable*/

import React, { useEffect, useState } from 'react'
import BlogList from './components/BlogList/BlogList'
import Login from './components/Login/Login'
import { setToken } from './services/Gateway'
import { logout } from './services/LoginService'
import { Alert } from './components/Alert/Alert'
const getUserFromLocalstorage = () => {
  const userData = window.localStorage.getItem('userSessionData') || null
  if (userData) {
    const {username, name, blogs} = JSON.parse(userData)
    return {
      username,
      name,
      blogs
    }
  }
  else {
    return null
  }
}
const getTokenFromLocalstorage = () => {
  const userData = window.localStorage.getItem('userSessionData') || null
  if (userData) {
    const {token} = JSON.parse(userData)
    return token
  }
  else {
    return null
  }
}
function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const user = getUserFromLocalstorage()
    const token = getTokenFromLocalstorage()
    if (user) {
      setUser(user)
      setToken(token)
    }
  }, [])
  const handleLogout = () => {
    const resetUser = logout()
    setUser(resetUser)
  }
  const submitUserHandle = (user) => {
    try {
      setUser(user)
    } catch (error) {
      setAlertMessage('usuario incorrecto')
        setTimeout(() => {
          setAlertMessage(null)
        }, 3000)
    }
  }
  return (
    <div>
      <Alert />
      {
        user
          ? <BlogList name={user.name} blogs={user.blogs}/>
          : <Login onLoginSubmit={submitUserHandle}/>
      }
      { user ? <button onClick={handleLogout}>Logout</button> : null}
    </div>
  )
}

export default App
