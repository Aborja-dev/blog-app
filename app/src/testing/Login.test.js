import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Login from '../components/Login'

test('renders content', () => {
  const mockHandler = jest.fn()
  const view = render(
    <Login onLoginSubmit={mockHandler} />
  )
  expect(view.container).toHaveTextContent(
    'Login user'
  )
})
