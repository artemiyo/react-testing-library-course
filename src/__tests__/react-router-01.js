import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import {Main} from '../main'

test('main renders about and home and I can navigate to those pages', () => {
  window.history.pushState({}, 'Test Page', '/')
  render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>,
  )
  expect(screen.getByRole('heading')).toHaveTextContent(/home/i)
  userEvent.click(screen.getByText(/about/i))
  expect(screen.getByRole('heading')).toHaveTextContent(/about/i)
})

test('landing on a bad page shows no match component', () => {
  window.history.pushState({}, 'Test page', '/something-that-does-not-match')
  render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>,
  )
  expect(screen.getByRole('heading')).toHaveTextContent(/404/i)
})
