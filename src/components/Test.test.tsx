import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

const set: Set = {
  title: 'questions',
  id: '1',
  questions: [
    { question: 'Q1', answer: 'A1', learnt: false },
    { question: 'Q2', answer: 'A2', learnt: false },
    { question: 'Q3', answer: 'A3', learnt: false }
  ]
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

it("shows the current question's answer when prompted", async () => {
  const { getByText } = render(<Test set={singleUnlearntQuestionSet} />)
  userEvent.click(getByText(/Show Answer/))
  expect(
    getByText(singleUnlearntQuestionSet.questions[0].answer)
  ).toBeInTheDocument()
})

it('shows the next question when prompted', async () => {
  const questionMatcher = /Q[1-3]/
  const { getByText } = render(<Test set={set} />)
  const currentQuestion = getByText(questionMatcher).textContent
  userEvent.click(getByText(/Next Card/))
  const newQuestion = getByText(questionMatcher).textContent
  expect(currentQuestion).not.toEqual(newQuestion)
})

it('loops round all possible questions', async () => {
  const questionMatcher = /Q[1-3]/
  const { getByText } = render(<Test set={set} />)
  const firstQuestion = getByText(questionMatcher).textContent
  set.questions.forEach(() => userEvent.click(getByText(/Next Card/)))
  expect(getByText(questionMatcher).textContent).toEqual(firstQuestion)
})
