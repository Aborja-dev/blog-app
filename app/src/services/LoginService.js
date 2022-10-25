
import { apiLogin, setToken } from './Gateway'

export const login = async (user) => {
  const loginResponse = await apiLogin(user)
  if (loginResponse === 'Usuario invalido o no existe') {
    return null
  }
  const userToken = loginResponse.token
  const { username, name, blogs } = loginResponse
  setToken(userToken)
  window.localStorage.setItem('userSessionData', JSON.stringify(loginResponse))
  return {
    username,
    name,
    blogs
  }
}
export const logout = () => {
  return null
}
