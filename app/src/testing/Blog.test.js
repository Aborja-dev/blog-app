/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import NewBlogForm from '../components/NewBlog'
import { Blog } from '../components/Blog'

const blogData = {
  title: 'blog de prueba 1',
  author: 'Abraham Borja',
  url: 'http://localhost:3000/',
  likes: 11,
  user: {
    id: '635780fe9d546328ba170e04'
  },
  id: '635788f83f82162a25079658'
}
describe('test for blog component', () => {
  test('renders content', () => {
    const view = render(
      <Blog blog={blogData} clickDelete={() => {}} clickLike={() => {}} />
    )
    const viewDetail = view.container.querySelector('article')
    const parent = viewDetail.parentNode
    expect(view.container).toHaveTextContent(blogData.title)
    expect(parent).toHaveStyle({ display: 'none' })
  })
  test('show content when click button', () => {
    const view = render(
      <Blog blog={blogData} clickDelete={() => {}} clickLike={() => {}} />
    )
    const viewDetail = view.getByTestId('blog-detail')
    const toggable = viewDetail.parentNode
    const showButton = view.getByText('show more')
    fireEvent.click(showButton)
    expect(toggable).toHaveStyle({ display: 'block' })
  })
  test('click button two times', () => {
    const likeMockHandler = jest.fn()
    const view = render(
      <Blog blog={blogData} clickDelete={() => {}} clickLike={likeMockHandler} />
    )
    const showButton = view.getByText('Like')
    fireEvent.click(showButton)
    fireEvent.click(showButton)
    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})
test('<NewBlogForm> create a new blog and submit', () => {
  const createBlog = jest.fn()
  const view = render(
    <NewBlogForm onSubmitForm={createBlog} />
  )
  const form = view.container.querySelector('form')
  const title = view.container.querySelector("input[name='title']")
  const url = view.container.querySelector("input[name='url']")
  fireEvent.change(title, { target: { value: 'Un blog hecho con jest' } })
  fireEvent.change(url, { target: { value: 'http://miblog/0' } })
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toMatch('Un blog hecho con jest')
})
