/* eslint-disable*/

import React, { useEffect, useState } from 'react'
import Blog from './components/Blog/Blog'
import Login from './components/Login/Login'
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

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const user = getUserFromLocalstorage()
    if (user) {
      setUser(user)
    }
  }, [])
  
  return (
    <div>
      {
        user
          ? <Blog name={user.name} blogs={user.blogs}/>
          : <Login onLoginSubmit={setUser}/>
      }
    </div>
  )
}

export default App
