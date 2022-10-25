
import { apiLogin, setToken } from './Gateway'

export const login = async (user) => {
  const loginResponse = await apiLogin(user)
  if (loginResponse === 'Usuario invalido o no existe') {
    return null
  }
  const userToken = loginResponse.token
  const { username, name } = loginResponse
  setToken(userToken)
  window.localStorage.setItem('userSessionData', JSON.stringify(loginResponse))
  return {
    username,
    name
  }
}

export const logout = () => {
  return null
}
