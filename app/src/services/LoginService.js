
import { apiLogin, setToken } from './Gateway'

export const login = async (user) => {
  const loginResponse = await apiLogin(user)
  const responseBody = loginResponse.data
  if (responseBody === 'Usuario invalido o no existe') {
    return { status: loginResponse.status }
  }
  const userToken = responseBody.token
  const { username, name } = responseBody
  setToken(userToken)
  window.localStorage.setItem('userSessionData', JSON.stringify(responseBody))
  return {
    body: {
      username,
      name
    },
    status: loginResponse.status
  }
}

export const logout = () => {
  return null
}
