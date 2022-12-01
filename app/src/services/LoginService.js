
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
  window.localStorage.setItem('userSession', JSON.stringify(responseBody))
  return {
    body: {
      username,
      name
    },
    status: loginResponse.status
  }
}
export const loginSwitch = (loginResult) => {
  const status = loginResult.status
  switch (status) {
    case 200:
      return loginResult.body
    case 401:
      return new Error('acceso incorrecto')
    default:
      return new Error('ocurrio un error')
  }
}
export const logout = () => {
  window.localStorage.removeItem('userSession')
  return null
}
