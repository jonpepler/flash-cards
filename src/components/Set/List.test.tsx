import { render } from '@testing-library/react'
import { List } from './List'
import { Set } from 'types'

const setList: Set[] = [
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

it('shows a list of sets', async () => {
  const { getByText } = render(<List list={setList} onSelect={() => null} />)
  setList.forEach((set) => expect(getByText(set.title)).toBeInTheDocument())
})
