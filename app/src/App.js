import React, { useEffect, useState } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import { setToken } from './services/Gateway'
import { logout } from './services/LoginService'
import { Alert } from './components/Alert'
import { getTokenFromLocalstorage, getUserFromLocalstorage } from './utils/utils_functions'
import { useDispatch } from 'react-redux'
import { userActions } from './reducer/userReducer'
import { showNotification } from './reducer/notificationReducer'

function App () {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  // const [alertMessage, setAlertMessage] = useState(null)
  useEffect(() => {
    const user = getUserFromLocalstorage()
    const token = getTokenFromLocalstorage()
    if (user) {
      setUser(user)
      setToken(token)
    }
  }, [])
  const handleLogout = () => {
    dispatch(userActions.logout())
    const resetUser = logout()
    setUser(resetUser)
  }
  const submitUserHandle = (user) => {
    user.constructor.name === 'Error'
      ? triggerAlertMessage(user.message)
      : setUser(user)
  }
  const triggerAlertMessage = (message) => {
    dispatch(showNotification(message, { time: 3000 }))
  }
  return (
    <div>
      <Alert />
      {
        user
          ? <BlogList user={user} />
          : <Login onLoginSubmit={submitUserHandle} />
      }
      {user ? <button onClick={handleLogout}>Logout</button> : null}
    </div>
  )
}

export default App
