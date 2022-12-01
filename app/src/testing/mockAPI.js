import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'

const blogList = [
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
export const server = setupServer(
  rest.get('/blogs', (req, res, ctx) => {
    return res(ctx.json(blogList))
  })
)
