import React, { useEffect, useState } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import { setToken } from './services/Gateway'
import { logout } from './services/LoginService'
import { Alert } from './components/Alert'
import { getTokenFromLocalstorage, getUserFromLocalstorage } from './utils/utils_functions'

function App () {
  const [user, setUser] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
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
    user.constructor.name === 'Error'
      ? triggerAlertMessage(user.message)
      : setUser(user)
  }
  const triggerAlertMessage = (message) => {
    setAlertMessage(message)
    setTimeout(() => {
      setAlertMessage(null)
    }, 3000)
  }
  return (
    <div>
      <Alert message={alertMessage} />
      {
        user
          ? <BlogList name={user.name} />
          : <Login onLoginSubmit={submitUserHandle} />
      }
      {user ? <button onClick={handleLogout}>Logout</button> : null}
    </div>
  )
}

export default App
