import { render } from '@testing-library/react'
import { List } from './List'
import { Set } from 'types'

const setList: Set[] = [
  {
    title: 'Set 1',
    id: '1'
  },
  {
    title: 'Set 2',
    id: '2'
  }
]

it('shows a list of sets', async () => {
  const { getByText } = render(<List list={setList} />)
  setList.forEach((set) => expect(getByText(set.title)).toBeInTheDocument())
})
