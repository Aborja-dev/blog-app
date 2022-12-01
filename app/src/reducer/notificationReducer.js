
export const showNotification = (message, { ...config }) => {
  return async (dispatch) => {
    debugger
    const { time } = config
    dispatch({
      type: '@notification/show',
      payload: message
    })
    setTimeout(() => {
      dispatch({
        type: '@notification/hide',
        payload: null
      })
    }, time)
  }
}

export default (state = null, { type, payload }) => {
  switch (type) {
    case '@notification/show':
      return payload
    case '@notification/hide':
      return null
    default:
      return state
  }
}
