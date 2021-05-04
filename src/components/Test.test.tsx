import { render } from '@testing-library/react'

import { Set } from 'types'

import { Test } from './Test'

const singleQuestionSet: Set = {
  title: 'singleQuestionSet',
  id: '1',
  questions: [{ question: 'Q', answer: 'A' }]
}

it('shows a question', async () => {
  const onlyPossibleQuestion = singleQuestionSet.questions[0].question
  const { getByText } = render(<Test set={singleQuestionSet} />)
  expect(getByText(new RegExp(`^${onlyPossibleQuestion}$`))).toBeInTheDocument()
})
