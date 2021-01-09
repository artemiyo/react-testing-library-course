import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import {HiddenMessage} from '../hidden-message'
import userEvent from '@testing-library/user-event'

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  }
})

test('shows hidden message when toggle is clicked', async () => {
  const myMessage = 'hello world'
  render(<HiddenMessage>{myMessage}</HiddenMessage>)
  const toggleButton = screen.getByText(/toggle/i)
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument()
  userEvent.click(toggleButton)
  expect(screen.getByText(myMessage)).toBeInTheDocument()
  userEvent.click(toggleButton)
  await waitFor(() =>
    expect(screen.queryByText(myMessage)).not.toBeInTheDocument(),
  )
})
