import { render } from '@testing-library/react'
import { App } from 'App'

it('renders the title', () => {
  const { getByText } = render(<App />)
  const titleElement = getByText(/Flash Cards/)
  expect(titleElement).toBeInTheDocument()
})
