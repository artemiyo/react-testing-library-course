import 'whatwg-fetch'
import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import userEvent from '@testing-library/user-event'
import {GreetingLoader} from '../greeting-loader-01-mocking'

const server = setupServer(
  rest.post('/greeting', (req, res, ctx) => {
    return res(ctx.json({data: {greeting: `Hello ${req.body.subject}`}}))
  }),
)

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('loads greeting on click', async () => {
  render(<GreetingLoader />)
  const nameInput = screen.getByLabelText(/name/i)
  const loadButton = screen.getByText(/load greeting/i)

  nameInput.value = 'Mary'
  userEvent.click(loadButton)
  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(`Hello Mary`),
  )
})
