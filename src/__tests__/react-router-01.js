import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import {render as rtlRender, screen} from '@testing-library/react'
import {Main} from '../main'

function render(ui, {route = '/', ...renderOptions} = {}) {
  window.history.pushState({}, 'Test Page', route)

  function Wrapper({children}) {
    return <BrowserRouter>{children}</BrowserRouter>
  }

  return rtlRender(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  })
}

function textContentAssertion(textContent) {
  expect(screen.getByRole('heading')).toHaveTextContent(textContent)
}

test('main renders about and home and I can navigate to those pages', () => {
  render(<Main />)
  textContentAssertion(/home/i)
  userEvent.click(screen.getByText(/about/i))
  textContentAssertion(/about/i)
})

test('landing on a bad page shows no match component', () => {
  render(<Main />, {route: '/something-that-does-not-match'})
  textContentAssertion(/404/i)
})
