import React from 'react'
import {render, screen} from '@testing-library/react'
import {Editor} from '../post-editor-02-state'
import userEvent from '@testing-library/user-event'

test('renders a from wit title, content, tags, and a submit button', () => {
  render(<Editor />)
  screen.getByLabelText(/title/i)
  screen.getByLabelText(/content/i)
  screen.getByLabelText(/tags/i)
  const button = screen.getByText(/submit/i)
  userEvent.click(button)
  expect(button).toBeDisabled()
})
