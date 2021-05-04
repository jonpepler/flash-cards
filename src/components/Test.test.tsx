import { render } from '@testing-library/react'

import { Set } from 'types'

import { Test } from './Test'

const singleQuestionSetWithNoLearnt: Set = {
  title: 'singleQuestionSet',
  id: '1',
  questions: [{ question: 'Q', answer: 'A' }]
}

const singleUnlearntQuestionSet: Set = {
  title: 'singleQuestionSet',
  id: '1',
  questions: [{ question: 'Q', answer: 'A', learnt: false }]
}

describe('shows an unlearnt question', () => {
  test('when the learnt property has not been set', async () => {
    const onlyPossibleQuestion =
      singleQuestionSetWithNoLearnt.questions[0].question
    const { getByText } = render(<Test set={singleQuestionSetWithNoLearnt} />)
    expect(
      getByText(new RegExp(`^${onlyPossibleQuestion}$`))
    ).toBeInTheDocument()
  })

  test('when the learnt property has been set as false', async () => {
    const onlyPossibleQuestion = singleUnlearntQuestionSet.questions[0].question
    const { getByText } = render(<Test set={singleUnlearntQuestionSet} />)
    expect(
      getByText(new RegExp(`^${onlyPossibleQuestion}$`))
    ).toBeInTheDocument()
  })
})
