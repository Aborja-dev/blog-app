import { getBlogsByUser } from '../services/Gateway'
import { server } from '../testing/mockAPI'
import { getIDFromLocalstorage } from '../utils/utils_functions'
import blogReducer from './blogReducer'

describe('blog reducer', () => {
  beforeAll(() => server.listen())

  test('return a list of blogs when inititate', () => {
    const initialArray = [
      {
        title: 'prueba 1',
        author: 'Abraham Borja',
        url: 'http://miblog.com/1',
        likes: 0,
        user: null,
        id: '6385a6ca49d09237645d5fa4'
      },
      {
        title: 'prueba 2',
        author: 'Ankahara Organistabraham Borja',
        url: 'http://miblog.com/2',
        likes: 0,
        user: null,
        id: '6385a6ca49d09237645d5fa6'
      }
    ]
    const action = {
      type: '@blog/init',
      payload: initialArray
    }
    const newState = blogReducer([], action)
    expect(newState).toHaveLength(2)
  })
  test('return a new list of blogs when created a new blog', () => {
    const initialArray = [
      {
        title: 'prueba 1',
        author: 'Abraham Borja',
        url: 'http://miblog.com/1',
        likes: 0

      },
      {
        title: 'prueba 2',
        author: 'Ankahara Organistabraham Borja',
        url: 'http://miblog.com/2',
        likes: 0

      }
    ]
    const newBlog = {
      title: 'blog 2',
      author: 'Abraham Borja',
      url: 'http://miblog.com/3',
      likes: 0

    }
    const action = {
      type: '@blog/create',
      payload: newBlog
    }
    const newState = blogReducer(initialArray, action)
    expect(newState).toHaveLength(initialArray.length + 1)
    expect(newState).toContain(newBlog)
  })
  test('fetch a request and return a list', async () => {
    const userId = getIDFromLocalstorage()
    const blogs = await getBlogsByUser(userId, '/blogs')
    expect(blogs).toHaveLength(2)
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
})
