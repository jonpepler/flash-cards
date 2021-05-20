import {
  render,
  RenderResult,
  waitForElementToBeRemoved
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { set } from 'idb-keyval'

import { App } from 'App'
import { Set } from 'types'
import { SetsProvider } from 'contexts'

const sets: Set[] = [
  {
    title: 'App.test.tsx Test Set 1',
    id: '1',
    questions: [
      {
        question: 'E=mc^2?',
        answer: 'yes',
        learnt: true
      }
    ]
  },
  {
    title: 'App.test.tsx Test Set 2',
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
    <SetsProvider
      value={{ sets, setTestResults: () => undefined, saving: false }}>
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

it('shows the progress of previously attempted sets', async () => {
  await set('sets', sets)
  const { getByText, findByText } = render(
    <SetsProvider>
      <App />
    </SetsProvider>
  )
  await findByText(/App.test.tsx Test Set 1/)
  expect(getByText(/100% learnt/)).toBeInTheDocument()
})

it('remembers progress from attempted tests', async () => {
  const { getByText, getAllByText, queryByText } = renderAppWithContext()

  userEvent.click(getByText(sets[1].title))

  userEvent.click(getByText(/Show Answer/))
  userEvent.click(getByText(/Correct/))

  await waitForElementToBeRemoved(() => queryByText(/Saving.../))

  userEvent.click(getByText(/Go Back/))

  expect(getAllByText(/100% learnt/)).toHaveLength(2)
})
