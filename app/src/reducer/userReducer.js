import { login, loginSwitch } from '../services/LoginService'

const loginAction = (user) => {
  return async dispatch => {
    try {
      const _login = await login(user)
      const loginResult = loginSwitch(_login)
      dispatch({
        type: '@user/login',
        payload: loginResult
      })
    } catch (error) {
      dispatch({
        type: '@user/error',
        payload: null
      })
    }
  }
}
const logout = () => {
  return {
    type: '@user/logout',
    payload: null
  }
}

export const userActions = {
  login: loginAction,
  logout
}

export default (state = null, { type, payload }) => {
  switch (type) {
    case '@user/login':
      return payload
    case '@user/logout':
      return null
    default:
      return state
  }
}
