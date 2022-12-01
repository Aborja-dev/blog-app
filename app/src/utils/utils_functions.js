export const getIDFromLocalstorage = () => {
  const userData = window.localStorage.getItem('userSession') || null
  if (userData) {
    const { id } = JSON.parse(userData)
    return id
  } else {
    return null
  }
}

export const getUserFromLocalstorage = () => {
  const userData = window.localStorage.getItem('userSession') || null
  if (userData) {
    const { username, name, blogs } = JSON.parse(userData)
    return {
      username,
      name,
      blogs
    }
  } else {
    return null
  }
}
export const getTokenFromLocalstorage = () => {
  const userData = window.localStorage.getItem('userSession') || null
  if (userData) {
    const { token } = JSON.parse(userData)
    return token
  } else {
    return null
  }
}
export const updateByLikes = (blog) => {
  const like = blog.likes + 1
  return {
    ...blog,
    likes: like
  }
}
export const sortByLikes = (a, b) => {
  const likesA = a.likes
  const likesB = b.likes
  return likesA < likesB
    ? 1
    : -1
}
