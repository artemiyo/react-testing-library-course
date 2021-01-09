import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {FavoriteNumber} from '../favorite-number'

describe('favorite number', () => {
  it('entering an invalid value shows an error message', () => {
    const {rerender} = render(<FavoriteNumber />)
    const input = screen.getByLabelText(/favorite number/i)
    userEvent.type(input, '10')
    const role = screen.getByRole('alert')
    expect(role).toHaveTextContent(/the number is invalid/i)
    rerender(<FavoriteNumber max={10} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('entering a valid value', () => {
    render(<FavoriteNumber />)
    const input = screen.getByLabelText(/favorite number/i)
    userEvent.type(input, '7')
    const role = screen.queryByRole('alert')
    expect(role).not.toBeInTheDocument()
  })
})
