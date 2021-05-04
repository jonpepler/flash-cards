import { render, RenderResult } from '@testing-library/react'

import { Set } from 'types'
import { SetsProvider } from 'contexts'

import { App } from 'App'
import userEvent from '@testing-library/user-event'

const sets: Set[] = [
  {
    title: 'Test Set 1',
    id: '1',
    questions: [
      {
        question: 'E=mc^2?',
        answer: 'yes'
      }
    ]
  },
  {
    title: 'Test Set 2',
    id: '2',
    questions: [
      {
        question: 'E=mc^2?',
        answer: 'yes'
      }
    ]
  }
]

const renderAppWithContext = (): RenderResult =>
  render(
    <SetsProvider value={{ sets }}>
      <App />
    </SetsProvider>
  )

it('renders the title', () => {
  const { getByText } = render(
    <SetsProvider>
      <App />
    </SetsProvider>
  )
  const titleElement = getByText(/Flash Cards/)
  expect(titleElement).toBeInTheDocument()
})

it('shows a list of sets', async () => {
  const { getByText } = renderAppWithContext()
  const setInTheDocument = (title: string): void =>
    expect(getByText(title)).toBeInTheDocument()
  sets.forEach((set) => setInTheDocument(set.title))
})

it('starts a test when a set is selected', async () => {
  const { getByText, queryByText } = renderAppWithContext()
  userEvent.click(getByText(sets[0].title))
  expect(getByText(sets[0].title)).toBeInTheDocument()
  expect(queryByText(sets[1].title)).not.toBeInTheDocument()
})
